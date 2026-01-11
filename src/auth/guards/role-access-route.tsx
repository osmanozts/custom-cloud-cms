// admin-route.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import AccessDeniedDialog from "../components/access-denied-dialog";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const RoleAccessRoute = () => {
  const { authRole, user } = useAuth();
  const location = useLocation();

  const { isOpen, onClose } = useDisclosure();
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen && redirectToHome) {
      setRedirectToHome(false);
    }
  }, [isOpen, redirectToHome]);

  if (authRole) {
    switch (authRole) {
      case "superadmin": // Administrator
      case "admin": // deprecated role
      case "employee_manager": // Stationsleiter
      case "vehicle_manager": // Flottenmanager
        return <Outlet />;
      case "employee": // Mitarbeiter (z.B. Fahrer)
        return (
          <Navigate
            to={`/employee-min-detail?profile_id=${user.id}`}
            replace
            state={{ path: location.pathname }}
          />
        );
      default:
        return (
          <>
            <AccessDeniedDialog
              isOpen={true}
              onClose={() => {
                onClose();
                setRedirectToHome(true);
              }}
            />
            {redirectToHome && <Navigate to={`/`} replace />}
          </>
        );
    }
  }
  return <Navigate to="/login" replace />;
};
