import {
  Box,
  Circle,
  Flex,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  WrapItem,
} from "@chakra-ui/react";
import {
  LuCar,
  LuFileStack,
  LuLayoutDashboard,
  LuLogOut,
  LuTable2,
  LuUser,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import { IconType } from "react-icons";
import logo from "../../assets/logo/lp-logistics.png";
import { NotificationDialog } from "../dialogs/notificatoin-dialog";
import { AdminHamburger } from "./admin-hamburger";

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
                <Text color={isActive(item.path) ? "accentColor" : "textColor"}>
                  {item.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
        <WrapItem cursor="pointer">
          <Circle bg="invertedColor" p={2}>
            <Icon as={LuUser} boxSize={6} />
          </Circle>
        </WrapItem>

        <NotificationDialog />
      </Flex>
      {showNavItems ? (
        <WrapItem cursor="pointer">
          <Icon as={LuLogOut} boxSize={6} />
        </WrapItem>
      ) : (
        <WrapItem cursor="pointer">
          <AdminHamburger />
        </WrapItem>
      )}
    </Flex>
  );
}
