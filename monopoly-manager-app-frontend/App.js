// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-native";
import { COLORS } from "./constants/theme";

export default function App() {
  // We no longer need to load fonts, so the app can render immediately.
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
