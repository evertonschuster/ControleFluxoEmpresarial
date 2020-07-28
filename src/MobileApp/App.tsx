import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackScreen from './src/router/HomeStackScreen';
import MenuScreen from './src/screens/menu/MenuScreen';

const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer  >
      <HomeStack.Navigator  >
        <HomeStack.Screen name="Home" component={HomeStackScreen} />
        <HomeStack.Screen name="Menu" component={MenuScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;