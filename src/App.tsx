import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./auth/auth-route";
import { AllEmployees, EmployeeMinimumDetail, Login } from "./pages";
import PermissionRoute from "./auth/permission-route";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<PermissionRoute />}>
          <Route path="/" element={<AllEmployees />} />
          <Route path="/all-employees" element={<AllEmployees />} />
        </Route>
        <Route
          path="/employee-min-detail"
          element={<EmployeeMinimumDetail />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
