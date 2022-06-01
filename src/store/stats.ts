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

interface MonthlyTotalArticlesState {}

export interface StatsSlice {
  stats: {
    category: CategoryState;
    keyword: KeywordState;
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
          // NOTE: Fake async
          setTimeout(() => {
            immerSet(set, (draft) => {
              draft.stats.category.nameList = res.data.data;
            });
          }, 1500);
        } catch (err) {
          immerSet(set, (draft) => {
            draft.stats.category.error = (err as Error).message;
          });
        }
        // NOTE: Fake async
        setTimeout(() => {
          immerSet(set, (draft) => {
            draft.stats.category.loading = false;
          });
        }, 1500);
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
        // NOTE: Fake async
        setTimeout(() => {
          immerSet(set, (draft) => {
            draft.stats.keyword.loading = false;
          });
        }, 1500);
      },
    },
  },
});

export default createStatsSlice;
