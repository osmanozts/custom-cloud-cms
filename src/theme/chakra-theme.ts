// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const customTheme = extendTheme({
  colors: {
    backgroundColor: "#fff",
    tileBgColor: "#F2F2F2",
    hoverColor: "#e3f2fd",

    inputBgColor: "#fff",

    accentColor: "#E30614",
    accentBorderColor: "#2B6CB0",
    accentHoverColor: "#2C5282",

    successColor: "#C6F6D5",
    dangerColor: "#FED7D7",

    textColor: "#3B3A38",

    buttonBgColor: {
      default: "gray",
      disabled: "#A0AEC0",
    },

    buttonTextColor: {
      default: "#fff",
      disabled: "#718096",
    },
  },
});
