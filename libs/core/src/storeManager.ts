/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type StoreState = {
  [key: string]: any;
  setState: (key: string, value: any) => void;
  getState: (key: string) => any;
  addStore: (store: ReturnType<typeof create>) => void;
};

export const useStoreManager = create<StoreState>((set, get) => ({
  setState: (key, value) => set({ [key]: value }),
  getState: (key) => get()[key],
  addStore: (store) => set((state) => ({ ...state, ...store })),
}));
