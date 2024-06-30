import { Container, Flex, Text } from "@chakra-ui/react";

type AllDocumentsProps = {};

export function AllDocuments({}: AllDocumentsProps) {
  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={12}
      pl={12}
      pr={12}
      height="100svh"
      borderWidth={1}
      maxWidth="800px"
    >
      <Flex mb={12} justifyContent="center">
        <Text fontSize={28}>Unternehmensinterne Dokumente</Text>
      </Flex>
    </Container>
  );
}
