import { Container, Flex } from "@chakra-ui/react";
import { CreateVehicleForm } from "../../components";

export function CreateVehicle() {
  return (
    <Container>
      <Flex alignItems="center" height="100vh">
        <CreateVehicleForm />
      </Flex>
    </Container>
  );
}
