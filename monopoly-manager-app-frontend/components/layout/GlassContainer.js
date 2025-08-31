// components/layout/GlassContainer.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const GlassContainer = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.glass,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SIZES.padding,
    overflow: "hidden", // Ensures children stay within the rounded corners
  },
});

export default GlassContainer;
