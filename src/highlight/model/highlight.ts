import * as mongoose from 'mongoose';

export const HighlightSchema = new mongoose.Schema(
  {
    text: String,
    summary: String,
    url: String,
    user: String,
    startOffset: Number,
    endOffset: Number,
    querySelector: String,
    tags: { type: Array, default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export interface SummaryRequest {
  text: string;
  url: string;
  user: string;
  startOffset: number;
  endOffset: number;
  querySelector: string;
}

export interface Highlight extends SummaryRequest {
  summary: string;
}

export interface CreatedHighlight extends Highlight {
  id: string;
  tags: Array<string>;
  createdAt: Date;
}
