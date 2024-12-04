// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const customTheme = extendTheme({
  colors: {
    backgroundColor: "#ffffff",
    tileBgColor: "#F2F2F2",
    hoverColor: "#e3f2fd",

    inputBgColor: "#ffffff",

    parcelColor: "#D2B7A5",
    parcelColor2: "#95887B",
    darkColor: "#383735",

    accentColor: "#E30614",

    successColor: "#C6F6D5",

    invertedColor: "#fff",

    textColor: "#3B3A38",
    invertedTextColor: "#ffffff",
  },
  fonts: {
    body: `'Open', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        color: "textColor",
        bg: "backgroundColor",
        fontFamily: "body",
      },
      "*::placeholder": {
        color: "textColor",
      },
    },
  },
});
