// navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import HomeScreen from "../screens/main/HomeScreen";
// Import DashboardScreen later when we create it
// import DashboardScreen from '../screens/game/DashboardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the default header
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
