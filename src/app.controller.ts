import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatedHighlight, SummaryRequest } from './highlight/model/highlight';
import { HighlightService } from './highlight/highlight.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly highlightService: HighlightService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('summarize')
  async summarize(
    @Body() requestBody: SummaryRequest,
  ): Promise<CreatedHighlight> {
    // Get summary
    const response = await this.appService.getSummary(requestBody.text);

    // Create highlight
    const highlightPayload = { ...requestBody, summary: response.text };
    const highlightResponse = this.highlightService.create(highlightPayload);
    return highlightResponse;
  }
}
