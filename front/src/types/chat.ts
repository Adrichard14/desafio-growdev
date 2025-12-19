
export interface Message {
    _id: string;
    chatId: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface Chat {
    _id: string;
    deleted?: boolean;
    userId: string;
    title: string;
    lastMessage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    chats?: string[];
}



export interface SendMessageRequest {
    chatId?: string;
    content: string;
}


export interface SendMessageResponse {
    chatId: string;
    userMessage: Message;
    assistantMessage: Message;
}


export interface GetChatResponse {
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
}


export interface GetChatsResponse {
    chats: Chat[];
    total: number;
}

export interface GeminiMessage {
    role: 'user' | 'model';
    content: string;
}

export interface CreateChatRequest {
    title?: string;
}

export interface CreateChatResponse {
    conversation: Chat;
}

export interface ChatStatus {
    isTyping: boolean;
    error?: string;
    lastUpdated: Date;
}

export interface ChatState {
    currentchatId: string | null;
    chats: Chat[];
    messages: Message[];
    status: ChatStatus;
}