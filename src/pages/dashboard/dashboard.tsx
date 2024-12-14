import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { LuCar, LuFileStack, LuTable2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type NavigationItems = {
  title: string;
  description: string;
  icon: IconType;
  path: string;
};

export function Dashboard() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Mitarbeiter Management",
      description: "Verwalten Sie alle Mitarbeiter.",
      icon: LuTable2,
      path: "/employee-management",
    },
    {
      title: "Fahrzeug Management",
      description: "Fahrzeug, Fahrer und Schaden Management.",
      icon: LuCar,
      path: "/vehicle-management",
    },
    {
      title: "Interne Dokumente",
      description: "Zugriff auf alle internen Dokumente des Unternehmens.",
      icon: LuFileStack,
      path: "/document-management",
    },
  ];

  const handleOnClick = (item: NavigationItems) => {
    navigate(item.path);
  };

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
      bg="backgroundColor"
    >
      <Heading as="h1" mb={12} textAlign="center">
        Local Parcel Logistics
      </Heading>
      <Grid
        width="100%"
        maxWidth="1200px"
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            as="button"
            onClick={() => handleOnClick(item)}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="tileBgColor"
            shadow="md"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            textAlign="left"
            gridColumn={
              items.length % 2 !== 0 && index === items.length - 1
                ? { base: "span 1", md: "span 2" }
                : "span 1"
            }
          >
            <Flex alignItems="center" mb={4}>
              <Icon as={item.icon} boxSize={8} mr={4} color="accentColor" />
              <Heading as="h2" size="md">
                {item.title}
              </Heading>
            </Flex>
            <Text fontSize="lg">{item.description}</Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
