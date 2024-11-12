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
  LuCar,
  LuFileStack,
  LuLayoutDashboard,
  LuLogOut,
  LuTable2,
} from "react-icons/lu";
import { useAuth } from "../../providers/auth-provider";
import { useNavigate } from "react-router-dom";

type Props = {};

export function AdminHamburger({}: Props) {
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
          <Text color="textColor">Startseite</Text>
        </MenuItem>
        <MenuItem
          icon={<LuTable2 />}
          onClick={() => navigate("/employee-management")}
        >
          <Text color="textColor">Mitarbeiter</Text>
        </MenuItem>
        <MenuItem
          icon={<LuFileStack />}
          onClick={() => navigate("/document-management")}
        >
          <Text color="textColor">interne Dokumente</Text>
        </MenuItem>
        <MenuItem
          icon={<LuCar />}
          onClick={() => navigate("/vehicle-management")}
        >
          <Text color="textColor">Fahrzeuge</Text>
        </MenuItem>
        <MenuItem icon={<LuLogOut />} onClick={signOut}>
          <Text color="textColor">Ausloggen</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
