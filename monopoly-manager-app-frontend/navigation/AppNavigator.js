// navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/main/HomeScreen";
import DashboardScreen from "../screens/game/DashboardScreen"; // Import the new screen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />{" "}
      {/* Add the route */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
