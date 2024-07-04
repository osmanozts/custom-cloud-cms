import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AdminRoute, AuthRoute } from "./auth/guards";
import {
  AllDocuments,
  AllEmployees,
  CreateNewUser,
  Dashboard,
  EditEmployee,
  EmployeeMinimumDetail,
  Login,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-employees" element={<AllEmployees />} />
          <Route path="/all-documents" element={<AllDocuments />} />
          <Route path="/create-new-user" element={<CreateNewUser />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
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
