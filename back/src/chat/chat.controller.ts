import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    sub: Types.ObjectId;
    email: string;
  };
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return await this.chatService.create(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/my-chats')
  async getMyChats(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return await this.chatService.getChatsByUser(user.sub);
  }

  @Get('/user/:id')
  async getChatsByUser(@Param('id') userId: Types.ObjectId) {
    return await this.chatService.getChatsByUser(userId);
  }

  @Get(':id')
  async getChatById(@Param('id') chatId: Types.ObjectId) {
    return await this.chatService.getChatById(chatId);
  }

  @UseGuards(AuthGuard)
  @Post('send-message')
  async sendMessage(
    @Body() body: { chatId?: string; content: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return await this.chatService.sendMessage({
      chatId: body.chatId ? new Types.ObjectId(body.chatId) : undefined,
      userId,
      content: body.content,
    });
  }

  @Delete(':id')
  async deleteChat(@Param('id') chatId: Types.ObjectId) {
    return await this.chatService.deleteChat(chatId);
  }
}
