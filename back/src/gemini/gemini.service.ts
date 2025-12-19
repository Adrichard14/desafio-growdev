import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { GeminiMessage } from 'src/chat/chat.model';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
  private geminiModel: string;

  constructor() {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não configurada no ambiente');
    }
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.geminiModel = model;
  }

  async generateResponse(userMessage: string, history: GeminiMessage[] = []): Promise<string> {
    try {
      const messages = [
        ...history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ];
      const config = {
        temperature: 0.7,
        maxOutputTokens: this.geminiModel === 'gemini-2.5-flash' ? 2000 : 4000,
      };

      const response = await this.ai.models.generateContent({
        model: this.geminiModel,
        contents: messages,
        config: config,
      });

      const text = response.text;

      if (!text) {
        throw new Error('Resposta vazia do Gemini');
      }

      return text;
    } catch (error) {
      throw new Error(error);
      //   const errorMessage = this.handleGeminiError(error);
      //   throw new HttpException(errorMessage, this.getHttpStatusFromError(error));
    }
  }
}
