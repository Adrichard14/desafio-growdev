import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/contexts/authContext';
import {
    Bot,
    User,
    Send,
    Plus,
    Trash2,
    MessageSquare, Loader, Sun, Moon
} from '../../components/ui/icons.tsx';

const IndexPage: React.FC = () => {
    const {
        messages,
        chats,
        currentChatId,
        isLoading,
        error,
        sendMessage,
        loadChats,
        loadChat,
        createNewChat,
        deleteChat,
    } = useChat();
    const { logout, user: loggedUser } = useAuth();
    const [inputMessage, setInputMessage] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme === 'dark' || (!savedTheme && prefersDark);
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadChats();
    }, [loadChats]);

    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const message = inputMessage;
        setInputMessage('');
        await sendMessage(message);
    };

    const handleNewChat = async () => {
        await createNewChat();
    };


    const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Deseja realmente excluir este chat?')) {
            await deleteChat(chatId);
        }
    };

    const handleLoadChat = async (chatId: string) => {
        await loadChat(chatId);
    };

    const user = !loggedUser ? { name: 'Usuário' } : { name: loggedUser.name };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={`flex h-screen ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>
            {showSidebar && (
                <div className={`w-80 border-r flex flex-col ${isDarkMode
                    ? 'bg-gray-800/80 backdrop-blur-lg border-gray-700'
                    : 'bg-white/80 backdrop-blur-lg border-gray-200'
                    }`}>
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Chats
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode
                                        ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
                                >
                                    {isDarkMode ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>

                                <button
                                    onClick={handleNewChat}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        } text-white`}
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <User className="w-4 h-4" />
                            <span>{user?.name}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {chats.length === 0 ? (
                            <div className={`text-center mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Nenhum chat ainda</p>
                            </div>
                        ) : (
                            chats.map((chat) => (
                                <button
                                    key={chat._id}
                                    onClick={() => handleLoadChat(chat._id)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors group ${currentChatId === chat._id
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 truncate">{chat.title}</p>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteChat(chat._id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={logout}
                            className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col">
                <div className={`backdrop-blur-lg border-b p-4 ${isDarkMode
                    ? 'bg-gray-800/80 border-gray-700'
                    : 'bg-white/80 border-gray-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className={`p-2 rounded-lg transition-colors lg:hidden ${isDarkMode
                                    ? 'hover:bg-gray-700'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                <MessageSquare className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Growzinho</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-12 h-12 text-white" />
                                </div>
                                <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Olá, eu sou o Growzinho, seu assistente virtual baseado no Google Gimini.
                                </h2>
                                <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Como posso te ajudar hoje?
                                </h2>
                                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Digite uma mensagem para começar a conversar</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => {
                                const isUser = message.role === 'user';
                                return (
                                    <div
                                        key={message._id}
                                        className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                                }`}
                                        >
                                            {isUser ? (
                                                <User className="w-6 h-6 text-white" />
                                            ) : (
                                                <Bot className="w-6 h-6 text-white" />
                                            )}
                                        </div>

                                        <Card className={`max-w-2xl ${isUser
                                            ? 'bg-blue-600 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-white'
                                                : 'bg-white'
                                            }`}>
                                            <CardContent className="p-4 pt-4">
                                                {message.content === 'Pensando...' ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader className="w-4 h-4 animate-spin" />
                                                        <span className="text-sm">Gemini está pensando...</span>
                                                    </div>
                                                ) : (
                                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                                )}
                                                <p className="text-xs opacity-70 mt-2">
                                                    {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {error && (
                    <div className="px-6 pb-2">
                        <div className={`border px-4 py-3 rounded-lg ${isDarkMode
                            ? 'bg-red-900/20 border-red-800 text-red-400'
                            : 'bg-red-50 border-red-200 text-red-700'
                            }`}>
                            <p className="text-sm">{error.message}</p>
                        </div>
                    </div>
                )}
                <div className={`backdrop-blur-lg border-t p-4 ${isDarkMode
                    ? 'bg-gray-800/80 border-gray-700'
                    : 'bg-white/80 border-gray-200'
                    }`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e as React.FormEvent<Element>);
                                    }
                                }}
                                placeholder="Digite sua mensagem..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;