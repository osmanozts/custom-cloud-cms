import {
  Avatar,
  Box,
  Flex,
  Image,
  WrapItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/logo/lp-logistics.png";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../providers/auth-provider";
import { useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { id: 1, label: "Startseite", path: "/" },
    { id: 2, label: "Mitarbeiter Tabelle", path: "/all-employees" },
    { id: 3, label: "interne Dokumente", path: "/all-documents" },
  ];

  return (
    <Flex height={70} backgroundColor="gray.200" alignItems="center" px={6}>
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        <Flex>
          {navItems.map((item) => (
            <Box
              key={item.id}
              paddingRight={12}
              cursor="pointer"
              onClick={() => navigate(item.path)}
            >
              <Text
                textDecoration={
                  location.pathname === item.path ? "underline" : "none"
                }
              >
                {item.label}
              </Text>
            </Box>
          ))}
        </Flex>
        <WrapItem cursor="pointer" marginRight={8}>
          <Avatar src="https://bit.ly/broken-link" />
        </WrapItem>
        <WrapItem cursor="pointer">
          <Icon as={LuLogOut} boxSize={6} onClick={signOut} />
        </WrapItem>
      </Flex>
    </Flex>
  );
}
