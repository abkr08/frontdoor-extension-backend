import { Controller, Post, Body, Put } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { CreatedHighlight, Highlight } from './model/highlight';

@Controller('highlight')
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) {}

  @Post('')
  async createHighlight(
    @Body() highlight: Highlight,
  ): Promise<CreatedHighlight> {
    console.log(highlight);
    const response = await this.highlightService.create(highlight);
    return response;
  }

  @Post('all')
  async getHighlights(
    @Body() requestBody: { url: string },
  ): Promise<Highlight[]> {
    const response = await this.highlightService.getHighlights(requestBody.url);
    return response;
  }

  @Put()
  async updateTags(
    @Body('id') highlightId: string,
    @Body('tags') newTags: string[],
  ): Promise<Highlight> {
    return this.highlightService.updateTags(highlightId, newTags);
  }
}
