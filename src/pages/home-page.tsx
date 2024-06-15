import { Box, Button } from "@chakra-ui/react";
import { useAuth } from "../providers/auth-provider";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  const { signOut } = useAuth();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button onClick={signOut}>Log dich aus</Button>
    </Box>
  );
};
