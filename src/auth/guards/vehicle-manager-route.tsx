// admin-route.tsx
import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "../../backend-queries";
import { useAuth } from "../../providers/auth-provider";
import { Tables } from "../../utils/database/types";
import AccessDeniedDialog from "../components/access-denied-dialog";

export const VehicleManagerRoute = () => {
  const { user } = useAuth();
  const { isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Tables<"profile">>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userProfile = await getProfile(user.id);
          setProfile(userProfile);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  if (profile) {
    switch (profile.auth_role) {
      case "superadmin":
      case "admin":
      case "vehicle_manager":
        return <Outlet />;

      case "employee_manager":
        return (
          <>
            <AccessDeniedDialog isOpen={isOpen} onClose={onClose} />
            <Navigate to={`/`} replace />;
          </>
        );
      default:
        break;
    }
  }
};
