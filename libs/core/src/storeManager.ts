import { create } from 'zustand';

type StoreState = {
  [key: string]: any;
  setState: (key: string, value: any) => void;
  getState: (key: string) => any;
};

export const useStoreManager = create<StoreState>((set, get) => ({
  setState: (key, value) => set({ [key]: value }),
  getState: (key) => get()[key],
}));
