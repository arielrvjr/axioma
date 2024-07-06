import { create } from 'zustand';

export type Plugin = {
  name: string;
  actions: { [key: string]: (...args: any[]) => any };
};

type PluginStore = {
  plugins: { [key: string]: Plugin };
  registerPlugin: (plugin: Plugin) => void;
  getPlugin: (name: string) => Plugin | undefined;
};

export const usePluginManager = create<PluginStore>((set, get) => ({
  plugins: {},
  registerPlugin: (plugin: Plugin) => {
    set((state) => ({
      plugins: { ...state.plugins, [plugin.name]: plugin },
    }));
  },
  getPlugin: (name: string) => {
    return get().plugins[name];
  },
}));
