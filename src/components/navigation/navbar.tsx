import { Avatar, Box, Flex, Image, WrapItem } from "@chakra-ui/react";

import logo from "../../assets/logo/lp-logistics.png";
import { Hamburger } from "./hamburger";

export function Navbar() {
  return (
    <Flex height={70} backgroundColor="tileBgColor" alignItems="center" px={6}>
      <Box width="70px" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
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
