import produce, { Draft } from 'immer';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import createArticleSlice, { ArticleSlice } from './article';
import createArticleDetailSlice, {ArticleDetailSlice} from './articleDetail';

export type Slice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

/**
 * Set state via Immer lib
 * @param set Zustand Setter
 * @param fn Function to mutate the draft state via Immer
 * @returns Callback setter
 */
export const immerSet = <T extends object>(
  set: SetState<T>,
  fn: (draft: Draft<T>) => void
) => set(produce<T>(fn));

export type RootSlice = ArticleSlice & ArticleDetailSlice;
// export type RootSlice2 = ArticleDetailSlice;
/**
 * Create Root slice for Zustand single global store
 * @param set State Setter
 * @param get State Getter
 * @returns
 */
const createRootSlice = (
  set: SetState<RootSlice>,
  get: GetState<RootSlice>
) => ({
  ...createArticleSlice(set, get),
  ...createArticleDetailSlice(set, get),
});

const useStore = create<RootSlice>()(devtools(createRootSlice));
export default useStore;
