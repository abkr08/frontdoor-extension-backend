import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatedHighlight, Highlight } from './model/highlight';

@Injectable()
export class HighlightService {
  constructor(
    @InjectModel('Highlight')
    private readonly highlightModel: Model<CreatedHighlight>,
  ) {}

  convertMongoHighlight(mongoHighlight: any): CreatedHighlight {
    const { _id, ...rest } = mongoHighlight._doc;
    const id = _id.toHexString();
    return { id, ...rest };
  }

  async create(highlight: Highlight): Promise<CreatedHighlight> {
    const newHighlight = new this.highlightModel(highlight);

    console.log(newHighlight);

    const result = await newHighlight.save();

    return this.convertMongoHighlight(result);
  }

  async getHighlights(url: string): Promise<CreatedHighlight[]> {
    const result = await this.highlightModel.find({ url });
    console.log(result);

    return result.map((highlight: any) =>
      this.convertMongoHighlight(highlight),
    );
  }

  async updateTags(
    highlightId: string,
    newTags: string[],
  ): Promise<CreatedHighlight> {
    const highlightToUpdate = await this.highlightModel.findById(highlightId);
    if (!highlightToUpdate) {
      throw new Error(`Highlight with id ${highlightId} not found`);
    }
    highlightToUpdate.tags = newTags;

    const updatedHighlight = await highlightToUpdate.save();
    return this.convertMongoHighlight(updatedHighlight);
  }
}
