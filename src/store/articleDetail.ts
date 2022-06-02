import axios from 'axios';
import configs from '../configs';
import { Article } from '../types/article';
import { immerSet, Slice } from './root';

export interface ArticleDetailSlice {
  articleDetail: {
    article: Article;
    initLoading: boolean;
    error?: string; // NOTE: currently just error message
    initFetch: (id: string) => Promise<void>;
  };
}

const createArticleDetailSlice: Slice<ArticleDetailSlice> = (set) => ({
  articleDetail: {
    article: {} as Article,
    initLoading: false,
    error: undefined,
    initFetch: async (id: string) => {
      immerSet(set, (draft) => {
        draft.articleDetail.initLoading = true;
      });
      try {
        const res = await axios.get(
          `${configs.DUTY_API_V1_URL}/articles/${id}`
        );
        // Update articles data
        immerSet(set, (draft) => {
          draft.articleDetail.article = res.data.data;
        });
      } catch (err) {
        immerSet(set, (draft) => {
          draft.articleDetail.error = (err as Error).message;
        });
      }
      immerSet(set, (draft) => {
        draft.articleDetail.initLoading = false;
      });
    },
  },
});

export default createArticleDetailSlice;
