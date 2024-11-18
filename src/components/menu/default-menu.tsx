import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";

export type MenuOption = {
  value: string | null;
  label: string;
  color?: string; // Neue Eigenschaft für die Farbe
};

type DefaultMenuProps = {
  options: MenuOption[];
  defaultValue?: string;
  onSelect: (value: string | null) => void;
};

export const DefaultMenu: React.FC<DefaultMenuProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);

  // Setze den default Wert aus options, falls vorhanden
  if (defaultValue && !selectedOption) {
    const defaultOption = options.find(
      (option) => option.value === defaultValue
    );
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }

  const handleSelect = (option: MenuOption) => {
    setSelectedOption(option);
    onSelect(option.value);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        value={defaultValue}
        width="100%"
        bg="backgroundColor"
      >
        {selectedOption ? (
          <Box display="flex" alignItems="center">
            {options[0].color && (
              <Box
                width="10px"
                height="10px"
                borderRadius="50%"
                backgroundColor={selectedOption.color ?? "tileBgColor"}
                marginRight="8px"
              />
            )}
            {selectedOption.label}
          </Box>
        ) : defaultValue ? (
          // Falls defaultOption gesetzt ist, zeige den Label des defaultOption an
          options.find((option) => option.value === defaultValue)?.label ||
          defaultValue
        ) : (
          "Wähle eine Farbe aus"
        )}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleSelect(option)}>
            <Box display="flex" alignItems="center">
              <Box
                width="10px"
                height="10px"
                borderRadius="50%"
                backgroundColor={option.color}
                marginRight="8px"
              />
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
