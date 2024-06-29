import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import { useEffect, useState } from "react";
import { Tables } from "../../utils/database/types";
import { Box, Spinner } from "@chakra-ui/react";
import { getProfile } from "../../backend-queries";

export const AdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Tables<"profile">>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userProfile = await getProfile(user.id); // Await the async fetchProfile function
          setProfile(userProfile); // Set the profile state
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    // You can render a loading spinner here or return null
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
  if (profile)
    return profile?.role === "superadmin" || profile?.role === "admin" ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate
        to={`/employee-min-detail?profile_id=${user.id}`}
        replace
        state={{ path: location.pathname }}
      />
    );
};
