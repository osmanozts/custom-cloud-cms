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
      case "superadmin":
      case "admin":
      case "employee_manager":
      case "vehicle_manager":
        return <Outlet />;
      case "employee":
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
