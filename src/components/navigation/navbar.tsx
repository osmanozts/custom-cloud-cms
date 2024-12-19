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
import { useAuth } from "../../providers/auth-provider";
import { NotificationDialog } from "../dialogs/notificatoin-dialog";
import { Hamburger } from "./hamburger";

type NavigationItems = {
  id: number;
  label: string;
  icon: IconType;
  path: string;
};

export function Navbar() {
  const { user, authRole, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, label: "Startseite", path: "/", icon: LuLayoutDashboard },
    {
      id: 2,
      label: "Mitarbeiter Management",
      path: "/employee-management",
      icon: LuTable2,
    },
    {
      id: 3,
      label: "Fehrzeug Management",
      path: "/vehicle-management",
      icon: LuCar,
    },
    {
      id: 4,
      label: "interne Dokumente",
      path: "/document-management",
      icon: LuFileStack,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const showNavItems = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const handleOnClick = (item: NavigationItems) => {
    navigate(item.path);
  };

  return (
    <Flex
      height="80px"
      backgroundColor="tileBgColor"
      alignItems="center"
      px={6}
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Box width="100px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        {showNavItems && authRole !== "employee" && (
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
        <WrapItem
          cursor="pointer"
          onClick={() => navigate(`/employee-min-detail?profile_id=${user.id}`)}
        >
          <Circle bg="invertedColor" p={2}>
            <Icon as={LuUser} boxSize={6} />
          </Circle>
        </WrapItem>

        <NotificationDialog />
      </Flex>
      {showNavItems ? (
        <WrapItem cursor="pointer" onClick={signOut}>
          <Icon as={LuLogOut} boxSize={6} />
        </WrapItem>
      ) : (
        <WrapItem cursor="pointer">
          <Hamburger />
        </WrapItem>
      )}
    </Flex>
  );
}
