import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import AccessDeniedDialog from "../components/access-denied-dialog";

export const EmployeeManagerRoute = () => {
  const { authRole } = useAuth();
  const { isOpen, onClose } = useDisclosure();

  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen && redirectToHome) {
      // Umleitung nach dem Schließen des Dialogs
      setRedirectToHome(false);
    }
  }, [isOpen, redirectToHome]);

  if (authRole) {
    switch (authRole) {
      case "superadmin":
      case "admin":
      case "employee_manager":
        return <Outlet />;

      default: {
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
  }

  return null; // Fallback, falls kein Profil geladen werden konnte
};
