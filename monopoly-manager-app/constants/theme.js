// constants/theme.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // Glassmorphism Pastel Glow
  background: "#121212",
  primary: "#4CC9F0", // Soft Blue
  secondary: "#F72585", // Magenta Pink
  accent: "#8CE99A", // Mint

  white: "#FFFFFF",
  text: "#F1F1F1",
  textMuted: "#CFCFCF",

  // Status Colors
  success: "#8CE99A",
  danger: "#F72585",

  // Glass Effect
  glass: "rgba(76, 201, 240, 0.1)", // A translucent version of the primary color
  glassBorder: "rgba(76, 201, 240, 0.2)",
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 16,
  padding: 24,

  // Font sizes
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // App dimensions
  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h1,
    lineHeight: 38,
    letterSpacing: -1,
  },
  h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h3, lineHeight: 24 },
  h4: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h4, lineHeight: 22 },
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
    color: COLORS.text,
  },
  button: {
    fontFamily: "Poppins-SemiBold",
    fontSize: SIZES.h4,
    color: COLORS.background,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
