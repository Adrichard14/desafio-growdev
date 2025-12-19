import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatWithMessages, Message } from './chat.model';
import { User } from '../user/user.model';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<Chat>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Message') private messageModel: Model<Message>,
    private readonly geminiService: GeminiService,
  ) {}
  async create(userId: Types.ObjectId, title?: string): Promise<Chat> {
    const chat = new this.chatModel({
      userId,
      title: title || 'Nova Conversa',
    });
    return await chat.save();
  }

  async getChatsByUser(userId: Types.ObjectId): Promise<Chat[]> {
    return this.chatModel.find({ userId }).populate('lastMessage').exec();
  }

  async getChatById(chatId: Types.ObjectId): Promise<ChatWithMessages> {
    const chat = await this.chatModel.findById(chatId).lean();

    if (!chat) throw new NotFoundException('Chat não encontrado');

    const messages = await this.messageModel
      .find({ chatId: chatId })
      .sort({ createdAt: 1 })
      .lean()
      .lean<Message[]>();

    return {
      ...chat,
      messages,
    } as unknown as ChatWithMessages;
  }

  private async getChatMessageHistory(
    chatId: Types.ObjectId,
    limit = 10,
  ): Promise<Array<{ role: 'user' | 'assistant'; content: string }>> {
    const messages = await this.messageModel
      .find({ chatId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('role content')
      .lean();

    return messages.reverse().map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  // async addParticipant(chatId: Types.ObjectId, userId: Types.ObjectId): Promise<Chat> {
  //   const chat = await this.chatModel.findByIdAndUpdate(
  //     chatId,
  //     { $addToSet: { participants: userId } },
  //     { new: true },
  //   );
  //   if (!chat) throw new NotFoundException('Chat não encontrado');

  //   await this.userModel.findByIdAndUpdate(userId, { $push: { chats: chat._id } });
  //   return chat;
  // }

  //   /**
  //    * Remover participante de um chat
  //    */
  //   async removeParticipant(chatId: Types.ObjectId, userId: Types.ObjectId): Promise<Chat> {
  //     const chat = await this.chatModel.findByIdAndUpdate(
  //       chatId,
  //       { $pull: { participants: userId } },
  //       { new: true },
  //     );
  //     if (!chat) throw new NotFoundException('Chat não encontrado');

  //     await this.userModel.findByIdAndUpdate(userId, { $pull: { chats: chat._id } });
  //     return chat;
  //   }

  async deleteChat(chatId: Types.ObjectId): Promise<Chat> {
    const chat = await this.chatModel.findByIdAndUpdate(chatId, { deleted: true }, { new: true });
    if (!chat) throw new NotFoundException('Chat não encontrado');
    return chat;
  }

  async sendMessage({
    chatId,
    userId,
    content,
  }: {
    chatId?: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
  }) {
    if (!chatId) {
      const newChat = await this.create(userId);
      chatId = newChat._id;
    }
    const userMessage = new this.messageModel({
      chatId,
      role: 'user',
      content,
    });

    await userMessage.save();

    const messageHistory = await this.getChatMessageHistory(chatId);

    const formattedHistory = messageHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : ('model' as const),
      content: msg.content,
    }));

    try {
      const geminiResponse = await this.geminiService.generateResponse(
        content,
        formattedHistory.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          content: msg.content,
        })),
      );

      const assistantMessage = new this.messageModel({
        chatId,
        role: 'assistant',
        content: geminiResponse,
      });
      await assistantMessage.save();

      const messageCount = await this.messageModel.countDocuments({ chatId });
      if (messageCount === 2) {
        const firstMessagePreview = content.substring(0, 30);
        await this.chatModel.findByIdAndUpdate(chatId, {
          title: firstMessagePreview + (content.length > 30 ? '...' : ''),
        });
      }

      await this.chatModel.findByIdAndUpdate(chatId, {
        updatedAt: new Date(),
      });

      return {
        chatId,
        userMessage,
        assistantMessage,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ocorreu um erro ao tentar enviar mensagem para o gemini');
    }

    // const created = await message.save();

    // await this.chatModel.findByIdAndUpdate(chatId, {
    //   lastMessage: created._id,
    //   updatedAt: new Date(),
    // });
  }
}
