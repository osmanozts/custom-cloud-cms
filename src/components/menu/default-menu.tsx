import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Text,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export type MenuOption = {
  value: string | null;
  label: string;
  color?: string;
  info?: string; // Zusatzinformationen für Tooltip
};

type DefaultMenuProps = {
  options: MenuOption[];
  defaultValue?: string;
  onSelect: (value: string | null) => void;
  isDisabled?: boolean;
};

export const DefaultMenu: React.FC<DefaultMenuProps> = ({
  options,
  defaultValue,
  onSelect,
  isDisabled,
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
        _hover={{ bg: "darkColor", color: "invertedTextColor" }}
        isDisabled={isDisabled}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            {selectedOption?.color && (
              <Box
                width="10px"
                height="10px"
                borderRadius="50%"
                backgroundColor={selectedOption.color ?? "tileBgColor"}
                marginRight="8px"
              />
            )}
            <Text>{selectedOption?.label || "Wähle eine Option"}</Text>
          </Box>
          {selectedOption?.info && (
            <Tooltip label={selectedOption.info} hasArrow placement="top">
              <IconButton
                aria-label="Info"
                icon={<InfoOutlineIcon />}
                size="xs"
                variant="ghost"
                color="gray.500"
                borderRadius="50%"
                _hover={{ bg: "gray.200" }}
              />
            </Tooltip>
          )}
        </Box>
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleSelect(option)}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" alignItems="center">
                {option.color && (
                  <Box
                    width="10px"
                    height="10px"
                    borderRadius="50%"
                    backgroundColor={option.color}
                    marginRight="8px"
                  />
                )}
                <Text>{option.label}</Text>
              </Box>
              {option.info && (
                <Tooltip label={option.info} hasArrow placement="top">
                  <IconButton
                    aria-label="Info"
                    icon={<InfoOutlineIcon />}
                    size="xs"
                    variant="ghost"
                    color="gray.500"
                    borderRadius="50%"
                    _hover={{ bg: "gray.200" }}
                  />
                </Tooltip>
              )}
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
