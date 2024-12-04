import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

import { useAuth } from "../../providers/auth-provider";

type Props = {};

export function Hamburger({}: Props) {
  const { signOut } = useAuth();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<LuLogOut />} onClick={signOut}>
          <Text>Ausloggen</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
