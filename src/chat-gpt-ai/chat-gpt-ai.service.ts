import { Injectable } from '@nestjs/common';
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  CreateCompletionResponse,
} from 'openai';
import { CompletionResponse } from './model/model-answer';

const MODEL_ID = 'text-curie-001';
const MAX_TOKENS = 100;

@Injectable()
export class ChatGptAiService {
  private readonly openAIApi: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.ORG_ID,
    });
    this.openAIApi = new OpenAIApi(configuration);
  }

  async getSummary(text: string): Promise<CompletionResponse> {
    const prompt = `In a few sentences, summarize the main points of the following text: ${text}`;
    const params: CreateCompletionRequest = {
      prompt,
      model: MODEL_ID,
      max_tokens: MAX_TOKENS,
    };

    try {
      const response = await this.openAIApi.createCompletion(params);
      const responseData: CreateCompletionResponse = response.data;

      const completionResponse: CompletionResponse = {
        id: responseData.id,
        object: responseData.object,
        created: responseData.created,
        model: responseData.model,
        text: responseData.choices[0].text.replace(/\n\n/g, ''),
      };

      return completionResponse;
    } catch (error) {
      console.log(error);
    }
  }
}
