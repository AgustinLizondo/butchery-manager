import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoggedNavigator from "./src/navigators/Logged";

export default function App() {
  return (
    <NavigationContainer>
      <LoggedNavigator />
    </NavigationContainer>
  );
}
