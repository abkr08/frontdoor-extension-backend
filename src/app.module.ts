import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HighlightModule } from './highlight/highlight.module';

@Module({
  imports: [
    ChatGptAiModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    HighlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
