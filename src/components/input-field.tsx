import {
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { ReactNode } from "react";

interface InputFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  regex?: RegExp;
  regexErrorText?: string;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputField({
  id,
  value,
  onChange,
  placeholder,
  icon,
  regex,
  regexErrorText = "Ungültiges Format",
  isPasswordField,
  isDisabled,
  onKeyDown,
}: InputFieldProps) {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (regex) {
      setIsValid(regex.test(newValue));
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <InputGroup>
        {icon && (
          <InputLeftElement
            pointerEvents="none"
            color="gray.500"
            children={icon}
          />
        )}
        <Tooltip
          label={isValid ? "" : regexErrorText}
          isOpen={!isValid}
          placement="right"
          bg="red.500"
          color="white"
        >
          <Input
            id={id}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            type={isPasswordField ? "password" : "text"}
            focusBorderColor={isValid ? "parcelColor2" : "red.500"}
            bg="inputBgColor"
            disabled={isDisabled}
            borderRadius="md"
            borderWidth="1px"
            borderColor={isValid ? "darkColor" : "red.500"}
            py={2}
            px={3}
          />
        </Tooltip>
      </InputGroup>
      {!isValid && (
        <Text mt={2} fontSize="sm" color="red.500">
          {regexErrorText}
        </Text>
      )}
    </Box>
  );
}
