import { AppRegistry } from 'react-native';
import * as React from 'react';
import {name as appName} from './app.json'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './src/Navigations/Navigation';
const Stack = createNativeStackNavigator();
AppRegistry.registerComponent(appName,()=>App);
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
function App() {
  return (
    
      <Navigation/>
  );
}

export default App;