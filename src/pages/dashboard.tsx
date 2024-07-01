import { Box, Container, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LuTable2, LuFileStack } from "react-icons/lu";

type DashboardProps = {};

export function Dashboard({}: DashboardProps) {
  const navigate = useNavigate();

  const items = [
    {
      title: "Mitarbeiter Tabelle",
      description: "Verwalten Sie alle Mitarbeiter und ihre Daten.",
      icon: LuTable2,
      path: "/all-employees",
    },
    {
      title: "Interne Dokumente",
      description: "Zugriff auf alle internen Dokumente des Unternehmens.",
      icon: LuFileStack,
      path: "/all-documents",
    },
  ];

  return (
    <Container
      height="100vh"
      width="100%"
      maxW="1000px"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      px={4}
      mt={8}
    >
      <Heading as="h1" mb={12} textAlign="center">
        Admin Dashboard
      </Heading>
      <Flex
        width="100%"
        maxWidth="1200px"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="center"
      >
        {items.map((item, index) => (
          <Box
            key={index}
            as="button"
            onClick={() => navigate(item.path)}
            p={6}
            m={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            shadow="md"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            width={{ base: "100%", md: "45%" }}
            height={150}
            textAlign="left"
          >
            <Flex alignItems="center" mb={4}>
              <Icon as={item.icon} boxSize={8} mr={4} color="teal.500" />
              <Heading as="h2" size="md">
                {item.title}
              </Heading>
            </Flex>
            <Text fontSize="lg">{item.description}</Text>
          </Box>
        ))}
      </Flex>
    </Container>
  );
}
