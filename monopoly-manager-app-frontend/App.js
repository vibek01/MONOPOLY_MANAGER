// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-native";
import { COLORS } from "./constants/theme";
import { GameProvider } from "./contexts/GameContext"; // Import the provider

export default function App() {
  return (
    <GameProvider>
      {" "}
      {/* Wrap the entire app */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GameProvider>
  );
}
