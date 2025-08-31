// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-native";
import { COLORS } from "./constants/theme";
import { GameProvider } from "./contexts/GameContext";

export default function App() {
  return (
    <GameProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GameProvider>
  );
}
