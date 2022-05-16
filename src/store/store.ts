import create from 'zustand';

interface UseStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useAppStore = create<UseStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useAppStore;
