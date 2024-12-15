import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./theme/chakra-theme.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastListener } from "./components/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <AuthProvider>
            <App />
            <ToastListener />
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
