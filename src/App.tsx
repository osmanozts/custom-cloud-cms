import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth/auth-route";
import { HomePage, LoginPage, OTPPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-otp" element={<OTPPage />} />
    </Routes>
  );
}

export default App;
