import {
  Input,
  InputGroup,
  InputLeftElement,
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
  isDate?: boolean;
  isTime?: boolean;
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
  isDate,
  isTime,
  onKeyDown,
}: InputFieldProps) {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (isDate) {
      // Automatically format date as DD.MM.YYYY
      newValue = newValue
        .replace(/[^0-9]/g, "") // Remove non-numeric characters
        .replace(/(\d{2})(\d{1,2})/, "$1.$2") // Add first dot
        .replace(/(\d{2}\.\d{2})(\d{1,4})/, "$1.$2") // Add second dot
        .slice(0, 10); // Limit to 10 characters (DD.MM.YYYY)
    }

    if (isTime) {
      // Automatically format time as HH:MM
      newValue = newValue
        .replace(/[^0-9]/g, "") // Remove non-numeric characters
        .replace(/(\d{2})(\d{1,2})/, "$1:$2") // Add colon
        .slice(0, 5); // Limit to 5 characters (HH:MM)
    }

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
      </InputGroup>
      {!isValid && (
        <Text mt={2} ml={2} fontSize="md" color="accentColor">
          {regexErrorText}
        </Text>
      )}
    </Box>
  );
}
