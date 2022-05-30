import axios from 'axios';
import configs from '../configs';
import { Article } from '../types/article';
import { immerSet, Slice } from './root';

export interface ArticleSlice {
  article: {
    articles: Article[];
    initialLoading: boolean;
    moreLoading: boolean;
    error?: string; // NOTE: currently just error message
    initialFetch: () => Promise<void>;
    empty: () => void;
  };
}

const createArticleSlice: Slice<ArticleSlice> = (set) => ({
  article: {
    articles: [],
    initialLoading: false,
    moreLoading: false,
    error: undefined,
    initialFetch: async () => {
      immerSet(set, (draft) => void (draft.article.initialLoading = true));
      try {
        const res = await axios.get(`${configs.DUTY_V1_API_URL}/articles`);
        immerSet(set, (draft) => void (draft.article.articles = res.data));
      } catch (err) {
        immerSet(
          set,
          (draft) => void (draft.article.error = (err as Error).message)
        );
      }
      immerSet(set, (draft) => void (draft.article.initialLoading = false));
    },
    empty: () => immerSet(set, (draft) => void (draft.article.articles = [])),
  },
});

export default createArticleSlice;
