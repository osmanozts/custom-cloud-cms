import { Box } from "@chakra-ui/react";
import { VerifyOtpForm } from "../../components";

export function OTPPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VerifyOtpForm />
    </Box>
  );
}
