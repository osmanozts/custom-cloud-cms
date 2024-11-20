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
  LuBell,
  LuCar,
  LuFileStack,
  LuLayoutDashboard,
  LuTable2,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo/lp-logistics.png";
import { AdminHamburger } from "./admin-hamburger";
import { IconType } from "react-icons";

type NavigationItems = {
  id: number;
  label: string;
  icon: IconType;
  path: string;
};

export function AdminNavbar() {
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
      icon: LuCar,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const showNavItems = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const handleOnClick = (item: NavigationItems) => {
    if (item.path === "/document-management")
      alert("Dieses Feature steht noch nicht zur Verfügung!");
    else navigate(item.path);
  };

  return (
    <Flex
      height="80px"
      backgroundColor="tileBgColor"
      alignItems="center"
      px={6}
    >
      <Box width="100px" justifyContent="center" alignItems="center">
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
                onClick={() => handleOnClick(item)}
              >
                <Icon
                  as={item.icon}
                  boxSize={6}
                  mr={2}
                  color={isActive(item.path) ? "accentColor" : "textColor"}
                />
                <Text
                  color={isActive(item.path) ? "accentColor" : "textColor"}
                  textDecoration={isActive(item.path) ? "underline" : "none"}
                >
                  {item.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
        <WrapItem cursor="pointer" marginRight={4}>
          <Avatar name="Osman Öztas" bg="backgroundColor" />
        </WrapItem>

        <WrapItem cursor="pointer">
          <Icon as={LuBell} boxSize={6} color="textColor" />
        </WrapItem>
      </Flex>
      {/* {!showNavItems && ( */}
      <WrapItem cursor="pointer">
        <AdminHamburger />
      </WrapItem>
      {/* )} */}
    </Flex>
  );
}
