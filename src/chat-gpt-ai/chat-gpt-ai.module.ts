import { Module } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';

@Module({
  providers: [ChatGptAiService],
  exports: [ChatGptAiService],
})
export class ChatGptAiModule {}
