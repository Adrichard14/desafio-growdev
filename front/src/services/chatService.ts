
import { apiClient } from '@/lib/axios';
import type {
    SendMessageRequest,
    SendMessageResponse,
    GetChatResponse,
    Chat,
} from '@/types/chat';

export class ChatService {
    private static readonly BASE_PATH = '/chat';

    static async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
        try {
            const response = await apiClient.post<SendMessageResponse>(
                `${this.BASE_PATH}/send-message`,
                data
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    static async getChats(): Promise<Chat[]> {
        try {
            const response = await apiClient.get<Chat[]>(
                `${this.BASE_PATH}/my-chats`
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar chats:', error);
            throw error;
        }
    }

    static async getChat(chatId: string): Promise<GetChatResponse> {
        try {
            const response = await apiClient.get<GetChatResponse>(
                `${this.BASE_PATH}/${chatId}`
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar chat:', error);
            throw error;
        }
    }

    static async createChat(name?: string): Promise<Chat> {
        try {
            const response = await apiClient.post<Chat>(
                `${this.BASE_PATH}`,
                { name: name || 'Novo Chat' }
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao criar chat:', error);
            throw error;
        }
    }

    static async deleteChat(chatId: string): Promise<void> {
        try {
            await apiClient.delete(`${this.BASE_PATH}/${chatId}`);
        } catch (error) {
            console.error('Erro ao deletar chat:', error);
            throw error;
        }
    }
}