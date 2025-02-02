// admin-route.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import AccessDeniedDialog from "../components/access-denied-dialog";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const OnlyAdminRoute = () => {
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
    return <Navigate to="/login" replace />;
};
