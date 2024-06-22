import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home';
import ProductsHomeScreen from '../screens/ProductsHome';
import { LoggedStackParamList } from './logged.types';


const LoggedNavigator = () => {
  const Stack = createNativeStackNavigator<LoggedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductsHome" component={ProductsHomeScreen} />
    </Stack.Navigator>
  )
}

export default LoggedNavigator