import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import ProductsHomeScreen from "../screens/ProductsHome";
import Cart from "../screens/Cart";
import { LoggedStackParamList } from "./logged.types";
import ContextProvider from "../contexts";
import Orders from "../screens/Orders";

const LoggedNavigator = () => {
  const Stack = createNativeStackNavigator<LoggedStackParamList>();

  return (
    <ContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductsHome" component={ProductsHomeScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Orders" component={Orders} />
      </Stack.Navigator>
    </ContextProvider>
  );
};

export default LoggedNavigator;
