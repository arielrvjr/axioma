import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useScreenManager, useStoreManager } from '@axioma/core';

const Stack = createNativeStackNavigator();

const App = () => {
  const screens = useScreenManager((state) => state.screens);
  const currentScreen = useStoreManager((state) => state.currentScreen);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentScreen}>
        {screens.map((screen) => (
          <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
