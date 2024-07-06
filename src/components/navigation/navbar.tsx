import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  WrapItem,
} from "@chakra-ui/react";
import {
  LuFileStack,
  LuLayoutDashboard,
  LuTable2,
  LuUsers,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo/lp-logistics.png";
import { Hamburger } from "./hamburger";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, label: "Startseite", path: "/", icon: LuLayoutDashboard },
    {
      id: 2,
      label: "Mitarbeiter",
      path: "/employee-management",
      icon: LuTable2,
    },
    {
      id: 3,
      label: "interne Dokumente",
      path: "/document-management",
      icon: LuFileStack,
    },
    {
      id: 4,
      label: "Fehrzeug Management",
      path: "/vehicle-management",
      icon: LuUsers,
    },
  ];

  const showNavItems = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  return (
    <Flex height={70} backgroundColor="tileBgColor" alignItems="center" px={6}>
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        {showNavItems && (
          <Flex>
            {navItems.map((item) => (
              <Flex
                key={item.id}
                paddingRight={12}
                cursor="pointer"
                onClick={() => navigate(item.path)}
              >
                <Icon as={item.icon} boxSize={6} mr={2} />
                <Text
                  textDecoration={
                    location.pathname === item.path ? "underline" : "none"
                  }
                >
                  {item.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
        <WrapItem cursor="pointer" marginRight={8}>
          <Avatar name="Osman Öztas" bg="backgroundColor" />
        </WrapItem>
      </Flex>
      <WrapItem cursor="pointer">
        <Hamburger />
      </WrapItem>
    </Flex>
  );
}
