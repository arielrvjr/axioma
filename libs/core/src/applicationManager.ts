import { useEffect, useCallback } from 'react';
import { Plugin, usePluginManager } from './pluginManager';
import { Module, useModuleManager } from './moduleManager';
import { useStoreManager } from './storeManager';
import { useScreenManager } from './screenManager';

export type ApplicationConfigType = {
  plugins: Plugin[];
  modules: Module[];
  mainModule: string;
};

export const useApplicationManager = (initialConfig: ApplicationConfigType) => {
  const { registerPlugin } = usePluginManager();
  const { registerModule, getModule } = useModuleManager();
  const { setState } = useStoreManager();
  const { getScreens } = useScreenManager();

  const initializePlugins = useCallback(
    (plugins: Plugin[]) => {
      plugins.length > 0 && plugins.forEach((p) => registerPlugin(p));
    },
    [registerPlugin]
  );
  const initializeModules = useCallback(
    (modules: Module[]) => {
      modules.length > 0 && modules.forEach((m) => registerModule(m));
    },
    [registerModule]
  );

  useEffect(() => {
    initializePlugins(initialConfig.plugins);
    initializeModules(initialConfig.modules);
    //going to mainModule
    const mainModule = getModule(initialConfig.mainModule);
    if (mainModule) {
      setState('currentScreen', mainModule.entryScreen);
    }
  }, [
    initialConfig,
    setState,
    initializePlugins,
    initializeModules,
    getModule,
  ]);

  const screens = getScreens();
  return { screens };
};
