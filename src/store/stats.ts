import axios from 'axios';
import configs from '../configs';
import { immerSet, Slice } from './root';

export interface KeywordData {
  text: string;
  value: string;
}
interface KeywordState {
  data: KeywordData[];
  loading: boolean;
  error?: string;
  fetch: (category: string) => Promise<void>;
}

interface CategoryState {
  nameList: string[];
  loading: boolean;
  error?: string;
  fetch: () => Promise<void>;
}

export interface CategoryArticleData {
  category: string;
  value: number;
}
interface MonthlyTotalArticlesState {
  data: CategoryArticleData[];
  loading: boolean;
  error?: string;
  fetch: (month: number, year: number) => Promise<void>;
}

interface FetchSentimentData {
  category: string;
  sentiment: number;
}

interface SentimentData {
  [key: string]: number;
}

interface SentimentState {
  data: SentimentData;
  error?: string;
  loading: boolean;
  fetch: () => Promise<void>;
}

export interface StatsSlice {
  stats: {
    category: CategoryState;
    keyword: KeywordState;
    monthlyTotalArticles: MonthlyTotalArticlesState;
    sentiment: SentimentState;
  };
}

/***
 * Create Stats slice
 */
const createStatsSlice: Slice<StatsSlice> = (set) => ({
  stats: {
    category: {
      nameList: [],
      loading: false,
      fetch: async () => {
        immerSet(set, (draft) => {
          draft.stats.category.loading = true;
        });
        try {
          const res = await axios.get(
            `${configs.DUTY_API_V1_URL}/categories/names`
          );
          immerSet(set, (draft) => {
            draft.stats.category.nameList = res.data.data;
          });
        } catch (err) {
          immerSet(set, (draft) => {
            draft.stats.category.error = (err as Error).message;
          });
        }
        immerSet(set, (draft) => {
          draft.stats.category.loading = false;
        });
      },
      error: undefined,
    },
    keyword: {
      data: [],
      loading: false,
      error: undefined,
      fetch: async (category: string) => {
        immerSet(set, (draft) => {
          draft.stats.keyword.loading = true;
        });
        try {
          const res = await axios.get(
            `${configs.DUTY_API_V1_URL}/stats/${category}/keywords`
          );
          immerSet(set, (draft) => {
            draft.stats.keyword.data = res.data.data;
          });
        } catch (err) {
          immerSet(set, (draft) => {
            draft.stats.keyword.error = (err as Error).message;
          });
        }
        immerSet(set, (draft) => {
          draft.stats.keyword.loading = false;
        });
      },
    },
    monthlyTotalArticles: {
      data: [],
      loading: false,
      error: undefined,
      fetch: async (month: number, year: number) => {
        immerSet(set, (draft) => {
          draft.stats.monthlyTotalArticles.loading = true;
        });
        try {
          const res = await axios.get(
            `${configs.DUTY_API_V1_URL}/stats/monthly-total-articles`,
            {
              params: {
                month,
                year,
              },
            }
          );
          immerSet(set, (draft) => {
            draft.stats.monthlyTotalArticles.data = res.data.data;
          });
        } catch (err) {
          immerSet(set, (draft) => {
            draft.stats.monthlyTotalArticles.error = (err as Error).message;
          });
        }
        immerSet(set, (draft) => {
          draft.stats.monthlyTotalArticles.loading = false;
        });
      },
    },
    sentiment: {
      data: {},
      loading: false,
      error: undefined,
      fetch: async () => {
        immerSet(set, (draft) => {
          draft.stats.sentiment.loading = true;
        });
        try {
          const res = await axios.get(
            `${configs.DUTY_API_V1_URL}/stats/sentiment-score`
          );
          immerSet(set, (draft) => {
            res.data.data.forEach((d: FetchSentimentData) => {
              draft.stats.sentiment.data[d.category] = d.sentiment;
            });
          });
        } catch (err) {
          immerSet(set, (draft) => {
            draft.stats.sentiment.error = (err as Error).message;
          });
        }
        immerSet(set, (draft) => {
          draft.stats.sentiment.loading = false;
        });
      },
    },
  },
});

export default createStatsSlice;
