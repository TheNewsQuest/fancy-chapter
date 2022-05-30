import axios from 'axios';
import configs from '../configs';
import { Article } from '../types/article';
import { immerSet, Slice } from './root';

interface CursorInfo {
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
      immerSet(set, (draft) => (draft.article.initLoading = true));
      try {
        const res = await axios.get(`${configs.DUTY_V1_API_URL}/articles`);
        immerSet(set, (draft) => void (draft.article.articles = res.data.data));
        immerSet(
          set,
          (draft) =>
            void (draft.article.cursor = {
              ...res.data.cursor,
            })
        );
      } catch (err) {
        immerSet(
          set,
          (draft) => void (draft.article.error = (err as Error).message)
        );
      }
      immerSet(set, (draft) => void (draft.article.initLoading = false));
    },
    moreFetch: async (cursor: CursorInfo) => {
      immerSet(set, (draft) => void (draft.article.moreLoading = true));
      try {
        const res = await axios.get(`${configs.DUTY_V1_API_URL}/articles`, {
          params: {
            datetime: cursor.datetime,
            id: cursor.id,
          },
        });
        // if cursor == null && data.length > 0 => disabled read more button
      } catch (err) {}
    },
  },
});

export default createArticleSlice;
