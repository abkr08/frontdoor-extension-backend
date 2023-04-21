import { Module } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HighlightSchema } from './model/highlight';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Highlight', schema: HighlightSchema }]),
  ],
  providers: [HighlightService],
  controllers: [HighlightController],
  exports: [HighlightService],
})
export class HighlightModule {}
