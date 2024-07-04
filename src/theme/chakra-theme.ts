// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const customTheme = extendTheme({
  colors: {
    backgroundColor: "#fff",
    tileBgColor: "#F7FAFC",
    inputBgColor: "#fff",

    accentBorderColor: "#2C5282",

    textColor: "#000",
  },
});
