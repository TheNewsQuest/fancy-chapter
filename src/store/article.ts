import axios from 'axios';
import configs from '../configs';
import { Article } from '../types/article';
import { immerSet, Slice } from './root';

export interface CursorInfo {
  datetime?: string;
  id?: string;
  isEnd?: boolean;
}

export interface ArticleSlice {
  article: {
    articles: Article[];
    cursor: CursorInfo;
    initLoading: boolean;
    moreLoading: boolean;
    error?: string; // NOTE: currently just error message
    initFetch: () => Promise<void>;
    moreFetch: (cursor: CursorInfo) => Promise<void>;
  };
}

const createArticleSlice: Slice<ArticleSlice> = (set) => ({
  article: {
    articles: [],
    cursor: {
      datetime: undefined,
      id: undefined,
      isEnd: undefined,
    },
    initLoading: false,
    moreLoading: false,
    error: undefined,
    initFetch: async () => {
      immerSet(set, (draft) => {
        draft.article.initLoading = true;
      });
      try {
        const res = await axios.get(`${configs.DUTY_API_V1_URL}/articles`);
        // Update articles data
        immerSet(set, (draft) => {
          draft.article.articles = res.data.data;
        });
        // Update cursor
        immerSet(set, (draft) => {
          draft.article.cursor = {
            ...res.data.cursor,
          };
        });
      } catch (err) {
        immerSet(set, (draft) => {
          draft.article.error = (err as Error).message;
        });
      }
      immerSet(set, (draft) => {
        draft.article.initLoading = false;
      });
    },
    moreFetch: async (cursor: CursorInfo) => {
      immerSet(set, (draft) => {
        draft.article.moreLoading = true;
      });
      try {
        const res = await axios.get(`${configs.DUTY_API_V1_URL}/articles`, {
          params: {
            datetime: cursor.datetime,
            id: cursor.id,
          },
        });
        // Update articles data
        immerSet(set, (draft) => {
          draft.article.articles.push(...res.data.data);
        });
        // Update cursor
        immerSet(set, (draft) => {
          draft.article.cursor = {
            ...res.data.cursor,
          };
        });
      } catch (err) {
        immerSet(set, (draft) => {
          draft.article.error = (err as Error).message;
        });
      }
      immerSet(set, (draft) => {
        draft.article.moreLoading = false;
      });
    },
  },
});

export default createArticleSlice;
