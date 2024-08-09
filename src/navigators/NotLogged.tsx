import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotLoggedStackParamList } from "./notlogged.types";
import SignInScreen from "../screens/SignIn";

const NotLoggedNavigator = () => {
  const Stack = createNativeStackNavigator<NotLoggedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default NotLoggedNavigator;
