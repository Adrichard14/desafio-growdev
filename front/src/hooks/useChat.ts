
import { useState, useCallback, SetStateAction, Dispatch } from 'react';
import { ChatService } from '../services/chatService';
import type { Message, Chat } from '../types/chat';

interface UseChatReturn {
    messages: Message[];
    chats: Chat[];
    currentChatId: string | null;
    isLoading: boolean;
    error: Error | null;
    sendMessage: (content: string) => Promise<void>;
    loadChats: () => Promise<void>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    loadChat: (chatId: string) => Promise<void>;
    createNewChat: () => Promise<void>;
    deleteChat: (chatId: string) => Promise<void>;
    clearMessages: () => void;
}

export const useChat = (): UseChatReturn => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        const tempUserMessage: Message = {
            _id: `temp-${Date.now()}`,
            chatId: currentChatId || '',
            role: 'user',
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const tempLoadingMessage: Message = {
            _id: `temp-loading-${Date.now()}`,
            chatId: currentChatId || '',
            role: 'assistant',
            content: 'Pensando...',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, tempUserMessage, tempLoadingMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await ChatService.sendMessage({
                chatId: currentChatId || undefined,
                content,
            });

            if (!currentChatId) {
                setCurrentChatId(response.chatId);
            }

            setMessages((prev) => [
                ...prev.filter(
                    (m) => m._id !== tempUserMessage._id && m._id !== tempLoadingMessage._id
                ),
                response.userMessage,
                response.assistantMessage,
            ]);

            await loadChats();
        } catch (err) {
            setError(err as Error);
            setMessages((prev) =>
                prev.filter(
                    (m) => m._id !== tempUserMessage._id && m._id !== tempLoadingMessage._id
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [currentChatId]);

    const loadChats = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await ChatService.getChats();
            setChats(response.filter(chat => !chat.deleted));
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadChat = useCallback(async (chatId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await ChatService.getChat(chatId);
            setMessages(response.messages);
            setCurrentChatId(chatId);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createNewChat = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const chat = await ChatService.createChat();
            setCurrentChatId(chat._id);
            setMessages([]);
            await loadChats();
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [loadChats]);

    const deleteChat = useCallback(async (chatId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await ChatService.deleteChat(chatId);

            setChats((prev) => prev.filter((c) => c._id !== chatId));

            if (currentChatId === chatId) {
                setCurrentChatId(null);
                setMessages([]);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [currentChatId]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setCurrentChatId(null);
    }, []);

    return {
        messages,
        chats,
        currentChatId,
        isLoading,
        error,
        setIsLoading,
        sendMessage,
        loadChats,
        loadChat,
        createNewChat,
        deleteChat,
        clearMessages,
    };
};