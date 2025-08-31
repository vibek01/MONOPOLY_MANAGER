// components/common/TextInput.js
import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const CustomTextInput = ({ ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textMuted}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.glass,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base * 1.5,
    transition: "border-color 0.3s ease", // Note: transition property is web-specific
  },
  containerFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5, // for Android shadow
  },
  input: {
    ...FONTS.body,
    color: COLORS.text,
  },
});

export default CustomTextInput;
