import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const customTheme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      backgroundColor: { default: "#ffffff", _dark: "#1A1917" },
      tileBgColor: { default: "#F2F2F2", _dark: "#252320" },
      inputBgColor: { default: "#ffffff", _dark: "#2A2825" },
      hoverColor: { default: "#F5EFE8", _dark: "#33302B" },

      invertedColor: { default: "#ffffff", _dark: "#EDE9E1" },
      invertedTextColor: { default: "#ffffff", _dark: "#ffffff" },

      textColor: { default: "#3B3A38", _dark: "#EDE9E1" },
      textSecondaryColor: { default: "#6B6B6B", _dark: "#A8A29B" },
      iconColor: { default: "#525252", _dark: "#C6C1B8" },
      borderColor: { default: "#E2E2E2", _dark: "#3D3A35" },

      accentColor: { default: "#E30614", _dark: "#E30614" },
      accentColorHover: { default: "#B00510", _dark: "#F04A56" },

      parcelColor: { default: "#D2B7A5", _dark: "#8A6E5B" },
      parcelColor2: { default: "#95887B", _dark: "#6B5F52" },
      darkColor: { default: "#383735", _dark: "#736E67" },
      successColor: { default: "#C6F6D5", _dark: "#2F5638" },
    },
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
