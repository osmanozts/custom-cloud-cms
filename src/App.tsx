import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AdminRoute, AuthRoute } from "./auth/guards";
import {
  AllDocuments,
  AllDriverHistory,
  AllEmployees,
  AllVehicles,
  CreateNewUser,
  Dashboard,
  EditEmployee,
  EditIncident,
  EditVehicle,
  EmployeeMinimumDetail,
  Login,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-management" element={<AllEmployees />} />
          <Route path="/document-management" element={<AllDocuments />} />
          <Route path="/vehicle-management" element={<AllVehicles />} />
          <Route path="/create-new-user" element={<CreateNewUser />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
          <Route path="/edit-vehicle" element={<EditVehicle />} />
          <Route path="/edit-vehicle" element={<EditVehicle />} />
          <Route path="/edit-incident" element={<EditIncident />} />
          <Route path="/driver-history" element={<AllDriverHistory />} />
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
