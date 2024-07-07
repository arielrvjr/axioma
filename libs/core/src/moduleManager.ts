import { create } from 'zustand';
import { useScreenManager } from './screenManager';
import { useStoreManager } from './storeManager';

export type Module = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routes: { [key: string]: React.ComponentType<any> };
  pluginsRequired: string[];
  dependencies: string[];
  entryScreen: string;
  store: ReturnType<typeof create>;
};

type ModuleManagerState = {
  modules: Record<string, Module>;
  registerModule: (module: Module) => void;
  getModule: (moduleName: string) => Module;
};

export const useModuleManager = create<ModuleManagerState>((set, get) => {
  const modules: Record<string, Module> = {};
  const storeManager = useStoreManager();
  return {
    modules,
    registerModule: (module: Module) => {
      set((state) => ({
        modules: { ...state.modules, [module.name]: module },
      }));

      storeManager.addStore(module.store);

      const { registerScreens } = useScreenManager.getState();
      if (module.routes) {
        const screens = Object.keys(module.routes).map((route) => ({
          name: route,
          component: module.routes[route],
        }));
        registerScreens(screens);
      }
    },
    getModule: (moduleName: string) => get().modules[moduleName],
  };
});
