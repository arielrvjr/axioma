import { AppRegistry } from 'react-native';
import App from './app/App';
import { useApplicationManager } from '@axioma/core';
import todoModule from './modules/todoModule';


const initialConfig = {
    plugins: [],
    modules: [todoModule],
    mainModule: 'todoModule', // Nombre del módulo principal
};

const Main = () => {
    useApplicationManager(initialConfig);
    return <App />;
};


AppRegistry.registerComponent('AxiomaNativeDemo', () => Main);
