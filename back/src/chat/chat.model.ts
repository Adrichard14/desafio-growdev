import mongoose, { Types } from 'mongoose';

export const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: Types.ObjectId, ref: 'Chat', required: true },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export const ChatSchema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'Nova Conversa' },
    deleted: { type: Boolean, default: false },
    lastMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true },
);

export interface Chat extends mongoose.Document {
  id: string;
  userId: Types.ObjectId;
  title: string;
}

export interface Message extends mongoose.Document {
  chatId: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatWithMessages extends Chat {
  messages: Message[];
}

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}
