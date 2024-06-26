import "./App.css";
import { Route, Routes } from "react-router-dom";

import {
  AllEmployees,
  CreateNewUser,
  EmployeeMinimumDetail,
  Login,
} from "./pages";
import { AdminRoute, AuthRoute } from "./auth/guards";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<AllEmployees />} />
          <Route path="/all-employees" element={<AllEmployees />} />
          <Route path="/create-new-user" element={<CreateNewUser />} />
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
