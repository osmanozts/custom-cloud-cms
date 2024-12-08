import "./App.css";

import { Route, Routes } from "react-router-dom";

import {
  AdminRoute,
  AuthRoute,
  EmployeeManagerRoute,
  VehicleManagerRoute,
} from "./auth/guards";
import {
  AllDocuments,
  AllDriverHistory,
  AllEmployees,
  AllVehicles,
  CreateNewUser,
  Dashboard,
  EditDriverHistory,
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
          <Route element={<EmployeeManagerRoute />}>
            <Route path="/employee-management" element={<AllEmployees />} />
            <Route path="/create-new-user" element={<CreateNewUser />} />
            <Route path="/edit-employee" element={<EditEmployee />} />
          </Route>
          <Route path="/vehicle-management" element={<AllVehicles />} />
          <Route element={<VehicleManagerRoute />}>
            <Route path="/driver-history" element={<AllDriverHistory />} />
            <Route path="/edit-vehicle" element={<EditVehicle />} />
            <Route path="/edit-vehicle" element={<EditVehicle />} />
            <Route path="/edit-incident" element={<EditIncident />} />
            <Route
              path="/edit-driver-history"
              element={<EditDriverHistory />}
            />
          </Route>
          <Route path="/document-management" element={<AllDocuments />} />
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
