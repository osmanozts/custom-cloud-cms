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
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <Flex height={70} backgroundColor="gray.200" alignItems="center" px={6}>
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Dan Abramov" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        <Flex>
          <Box
            paddingRight={12}
            cursor="pointer"
            onClick={() => navigate("/all-employees")}
          >
            <Text>Mitarbeiter Tabelle</Text>
          </Box>
          <Box
            paddingRight={12}
            cursor="pointer"
            onClick={() => console.log("NOT IMPLEMENTED YET!")}
          >
            <Text>Ordner Struktur</Text>
          </Box>
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
