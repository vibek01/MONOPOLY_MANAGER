// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "react-native";
import { COLORS } from "./constants/theme";
import { GameProvider } from "./contexts/GameContext";
import { SocketProvider } from "./contexts/SocketContext"; // Import SocketProvider

export default function App() {
  return (
    <SocketProvider>
      {" "}
      {/* Add the SocketProvider here */}
      <GameProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.background}
        />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GameProvider>
    </SocketProvider>
  );
}
