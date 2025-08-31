// components/common/Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
}) => {
  const buttonStyles = [
    styles.button,
    variant === "secondary" && styles.secondaryButton,
    disabled && styles.disabledButton,
  ];

  const textStyles = [
    styles.text,
    variant === "secondary" && styles.secondaryText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: SIZES.padding * 0.75,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    shadowColor: "transparent", // No shadow for secondary
    elevation: 0,
  },
  disabledButton: {
    backgroundColor: COLORS.glass,
    shadowColor: "transparent",
    elevation: 0,
  },
  text: {
    ...FONTS.button,
  },
  secondaryText: {
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
  iconContainer: {
    marginRight: SIZES.base,
  },
});

export default CustomButton;
