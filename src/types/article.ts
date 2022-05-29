/* * Typings for MongoDB 'articles' collection * */

export interface Article {
  title: string;

  thumbnailURL?: string;

  content: string;

  link: string;

  author?: string;

  category: string;

  subcategory?: string;

  provider: Provider;

  providerThumbnailURL?: string;

  quests: Quest[];

  postedAt: Date;

  createdAt: Date;

  deletedAt?: Date;
}

export interface Quest {
  description: string;

  choices: string[];

  answer: number;

  createdAt: Date;
}

export enum Provider {
  VNExpress = 'vnexpress',
  CBSNews = 'cbsnews',
}
