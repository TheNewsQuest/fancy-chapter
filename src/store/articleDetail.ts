import axios from "axios";
import configs from "../configs";
import { Article } from "../types/article";
import { immerSet, Slice } from "./root";
import mockData from "src/pages/index.mock";


export interface ArticleDetailSlice {
  articleDetail: {
    article: Article;
    initLoading: boolean;
    error?: string; // NOTE: currently just error message
    initFetch: () => Promise<void>;
  };
}

const createArticleDetailSlice: Slice<ArticleDetailSlice> = (set) => ({
  articleDetail: {
    article: {} as Article,
    initLoading: false,
    error: undefined,
    initFetch: async () => {
      immerSet(set, (draft) => {
        draft.articleDetail.initLoading = true;
      });
      try {
        // const res = await axios.get(`${configs.DUTY_API_V1_URL}/articles`);
        const res = mockData[10];
        // Update articles data
        immerSet(set, (draft) => {
          draft.articleDetail.article = res;
        });
      } catch (err) {
        immerSet(set, (draft) => {
          draft.articleDetail.error = (err as Error).message;
        });
      }
      // NOTE: Fake async
      setTimeout(() => {
        immerSet(set, (draft) => {
          draft.articleDetail.initLoading = false;
        });
      }, 2000);
    },
  },
});

export default createArticleDetailSlice;
