/* * Typings for MongoDB 'articles' collection * */

export interface Article {
  _id: string;

  title: string;

  thumbnailURL?: string;

  content: string;

  link: string;

  author?: string;

  category: string;

  subcategory?: string;

  provider: string;

  providerAvatarURL?: string;

  quests: Quest[];

  postedAt: string;

  createdAt: string;

  deletedAt?: string | null;
}

export interface Quest {
  description: string;

  choices: string[];

  answer: number;

  createdAt: string;
}

export enum Provider {
  VNExpress = 'vnexpress',
  CBSNews = 'cbsnews',
}
