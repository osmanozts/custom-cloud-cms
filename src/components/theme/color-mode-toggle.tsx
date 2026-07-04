import { Icon, Tooltip, useColorMode, WrapItem } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

export const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const label = isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln";

  return (
    <Tooltip label={label} placement="bottom" hasArrow>
      <WrapItem
        cursor="pointer"
        onClick={toggleColorMode}
        aria-label={label}
      >
        <Icon as={isDark ? LuSun : LuMoon} boxSize={6} />
      </WrapItem>
    </Tooltip>
  );
};
