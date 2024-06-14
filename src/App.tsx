import "./App.css";
import { useState, useEffect } from "react";
import supabase from "./utils/supabase";
import { Session } from "@supabase/supabase-js";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth/auth-route";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
