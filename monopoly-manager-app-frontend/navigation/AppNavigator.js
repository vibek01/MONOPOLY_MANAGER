// navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/main/HomeScreen";
import DashboardScreen from "../screens/game/DashboardScreen";

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
      <Stack.Screen name="Dashboard" component={DashboardScreen} />

      {/* 
        This is the correct way to comment inside JSX.
        The previous errors were caused by using '//' which is treated as text.
      */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
