import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth/auth-route";
import { AllEmployees, Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<AllEmployees />} />
        <Route path="/all-employees" element={<AllEmployees />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
