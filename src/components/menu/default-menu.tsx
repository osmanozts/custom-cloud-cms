import React, { useMemo } from "react";
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
  info?: string;
};

type DefaultMenuProps = {
  options: MenuOption[];
  value: string | null;
  onSelect: (value: string | null) => void;
  isDisabled?: boolean;
  placeholder?: string;
};

export const DefaultMenu: React.FC<DefaultMenuProps> = ({
  options,
  value,
  onSelect,
  isDisabled,
  placeholder = "Wähle eine Option",
}) => {
  const selectedOption = useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found ?? null;
  }, [options, value]);

  const handleSelect = (option: MenuOption) => {
    onSelect(option.value);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
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
            <Text>{selectedOption?.label ?? placeholder}</Text>
          </Box>

          {selectedOption?.info && (
            <Tooltip label={selectedOption.info} hasArrow placement="top">
              <IconButton
                aria-label="Info"
                icon={<InfoOutlineIcon />}
                size="xs"
                variant="ghost"
                color="iconColor"
                borderRadius="50%"
                _hover={{ bg: "gray.200" }}
                onClick={(e) => e.stopPropagation()}
              />
            </Tooltip>
          )}
        </Box>
      </MenuButton>

      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={`${option.value ?? "null"}-${option.label}`}
            onClick={() => handleSelect(option)}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
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
                    color="iconColor"
                    borderRadius="50%"
                    _hover={{ bg: "gray.200" }}
                    onClick={(e) => e.stopPropagation()}
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
