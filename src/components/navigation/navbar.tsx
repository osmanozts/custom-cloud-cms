import {
  Avatar,
  Box,
  Flex,
  Image,
  WrapItem,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import logo from "../../assets/logo/lp-logistics.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Hamburger } from "./hamburger";
import {
  LuFileStack,
  LuLayoutDashboard,
  LuTable2,
  LuUsers,
} from "react-icons/lu";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, label: "Startseite", path: "/", icon: LuLayoutDashboard },
    {
      id: 2,
      label: "Mitarbeiter",
      path: "/all-employees",
      icon: LuTable2,
    },
    {
      id: 3,
      label: "interne Dokumente",
      path: "/all-documents",
      icon: LuFileStack,
    },
    {
      id: 4,
      label: "Mitarbeiter Dokumente",
      path: "/",
      icon: LuUsers,
    },
  ];

  const showNavItems = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  return (
    <Flex height={70} backgroundColor="gray.200" alignItems="center" px={6}>
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
          <Avatar name="Osman Öztas" />
        </WrapItem>
      </Flex>
      <WrapItem cursor="pointer">
        <Hamburger />
      </WrapItem>
    </Flex>
  );
}
