import {
  Box,
  Circle,
  Flex,
  Icon,
  Image,
  useBreakpointValue,
  WrapItem,
} from "@chakra-ui/react";
import { LuLogOut, LuUser } from "react-icons/lu";
import logo from "../../assets/logo/lp-logistics.png";
import { AdminHamburger } from "./admin-hamburger";
import { useAuth } from "../../providers/auth-provider";

export function Navbar() {
  const showNavItems = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const { signOut } = useAuth();

  return (
    <Flex height={70} backgroundColor="tileBgColor" alignItems="center" px={6}>
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        <WrapItem cursor="pointer">
          <Circle bg="invertedColor" p={2}>
            <Icon as={LuUser} boxSize={6} />
          </Circle>
        </WrapItem>
      </Flex>
      {showNavItems ? (
        <WrapItem cursor="pointer" onClick={signOut} mx={4}>
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
