import { Container, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";

import { DocumentManager } from "../../components";

export interface File {
  name: string;
  id: string;
  created_at: string;
}

export function AllDocuments() {
  const containerPadding = useBreakpointValue({ base: 4, md: 12 });

  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={containerPadding}
      pl={containerPadding}
      pr={containerPadding}
      height="100svh"
      maxW="container.xl"
      boxShadow="xl"
      bg="backgroundColor"
    >
      <Flex mb={6} justifyContent="center">
        <Heading fontSize={{ base: 24, md: 28 }}>
          Unternehmensinterne Dateien
        </Heading>
      </Flex>

      <DocumentManager
        bucket="dateien_unternehmen"
        rootFolder="interne_dokumente"
      />
    </Container>
  );
}
