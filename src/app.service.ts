import { Injectable } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai/chat-gpt-ai.service';
import { CompletionResponse } from './chat-gpt-ai/model/model-answer';

@Injectable()
export class AppService {
  constructor(private readonly chatGptService: ChatGptAiService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getSummary(text: string): Promise<CompletionResponse> {
    const response = await this.chatGptService.getSummary(text);
    return response;
  }
}
