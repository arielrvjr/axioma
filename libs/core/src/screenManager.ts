import { create } from 'zustand';

type Screen = {
  name: string;
  component: React.ComponentType<any>;
};

type ScreenStore = {
  screens: Screen[];
  registerScreens: (newScreens: Screen[]) => void;
  getScreens: () => Screen[];
};

export const useScreenManager = create<ScreenStore>((set, get) => ({
  screens: [],
  registerScreens: (newScreens) =>
    set((state) => ({
      screens: [...state.screens, ...newScreens],
    })),
  getScreens: () => get().screens,
}));
