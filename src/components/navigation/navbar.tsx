import { Avatar, Box, Flex, Image, WrapItem, Icon } from "@chakra-ui/react";
import logo from "../../assets/logo/lp-logistics.png";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../providers/auth-provider";

export function Navbar() {
  const { signOut } = useAuth();

  return (
    <Flex
      height={70}
      backgroundColor="gray.200"
      justifyContent="space-between"
      alignItems="center"
      px={6}
    >
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Dan Abramov" objectFit="contain" />
      </Box>
      <Flex alignItems="center">
        <WrapItem marginRight={8}>
          <Avatar src="https://bit.ly/broken-link" />
        </WrapItem>
        <Icon as={LuLogOut} boxSize={6} onClick={signOut} />
      </Flex>
    </Flex>
  );
}
