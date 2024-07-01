import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  LuFileStack,
  LuLayoutDashboard,
  LuLogOut,
  LuTable2,
} from "react-icons/lu";
import { useAuth } from "../../providers/auth-provider";
import { useNavigate } from "react-router-dom";

type Props = {};

export function Hamburger({}: Props) {
  const navigate = useNavigate();
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
        <MenuItem icon={<LuLayoutDashboard />} onClick={() => navigate("/")}>
          <Text>Startseite</Text>
        </MenuItem>
        <MenuItem
          icon={<LuTable2 />}
          onClick={() => navigate("/all-employees")}
        >
          <Text>Mitarbeiter</Text>
        </MenuItem>
        <MenuItem
          icon={<LuFileStack />}
          onClick={() => navigate("/all-documents")}
        >
          <Text>interne Dokumente</Text>
        </MenuItem>
        <MenuItem icon={<LuLogOut />} onClick={signOut}>
          <Text>Ausloggen</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
