// Tipos para plugins
type Plugin = {
  name: string;
  functionalities: { [key: string]: Function };
};

// Tipos para módulos
type Module = {
  name: string;
  routes: { [key: string]: React.ComponentType };
  pluginsRequired: string[];
  dependencies: string[];
  entryScreen: string;
};
