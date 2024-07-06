import { create } from 'zustand';
import { useScreenManager } from './screenManager';

export type Module = {
  name: string;
  routes: { [key: string]: React.ComponentType<any> };
  pluginsRequired: string[];
  dependencies: string[];
  entryScreen: string;
  functionalities: { [key: string]: (...args: any[]) => any };
};

type ModuleStore = {
  modules: { [key: string]: Module };
  registerModule: (module: Module) => void;
  getModule: (name: string) => Module | undefined;
};

export const useModuleManager = create<ModuleStore>((set, get) => ({
  modules: {},
  registerModule: (module: Module) => {
    set((state) => ({
      modules: { ...state.modules, [module.name]: module },
    }));

    const { registerScreens } = useScreenManager.getState();
    if (module.routes) {
      const screens = Object.keys(module.routes).map((route) => ({
        name: route,
        component: module.routes[route],
      }));
      registerScreens(screens);
    }
  },
  getModule: (name: string) => {
    return get().modules[name];
  },
}));
