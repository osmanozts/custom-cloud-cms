// admin-route.tsx
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getProfile } from "../../backend-queries";
import { useAuth } from "../../providers/auth-provider";
import { Tables } from "../../utils/database/types";

export const AdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
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
        break;
    }
  }
  return <Navigate to="/login" replace />;
};
