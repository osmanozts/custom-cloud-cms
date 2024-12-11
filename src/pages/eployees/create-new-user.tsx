import { Container, Flex } from "@chakra-ui/react";
import { CreateEmployeeForm } from "../../components";

export function CreateNewUser() {
  return (
    <Container>
      <Flex alignItems="center" height="100vh">
        <CreateEmployeeForm />
      </Flex>
    </Container>
  );
}
