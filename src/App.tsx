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
  CreateVehicle,
  Dashboard,
  EditDriverHistory,
  EditEmployee,
  EditIncident,
  EditVehicle,
  EmployeeMinimumDetail,
  Login,
} from "./pages";
import { AllKmHistory } from "./pages/vehicles/all-km-history";
import { EditKmHistory } from "./pages/vehicles/edit-km-history";

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
          <Route element={<VehicleManagerRoute />}>
            <Route path="/vehicle-management" element={<AllVehicles />} />
            <Route path="/create-vehicle" element={<CreateVehicle />} />
            <Route path="/edit-vehicle" element={<EditVehicle />} />
            <Route path="/edit-vehicle" element={<EditVehicle />} />
            <Route path="/edit-incident" element={<EditIncident />} />
            <Route path="/driver-history" element={<AllDriverHistory />} />
            <Route
              path="/edit-driver-history"
              element={<EditDriverHistory />}
            />
            <Route path="/edit-km-history" element={<EditKmHistory />} />
            <Route path="/km-history" element={<AllKmHistory />} />
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
