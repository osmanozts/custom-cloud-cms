import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";

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
  isTextArea?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
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
  isTextArea,
  onKeyDown,
}: InputFieldProps) {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = event.target.value;

    if (isDate) {
      newValue = newValue
        .replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1.$2")
        .replace(/(\d{2}\.\d{2})(\d{1,4})/, "$1.$2")
        .slice(0, 10);
    }

    if (isTime) {
      newValue = newValue
        .replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1:$2")
        .slice(0, 5);
    }

    if (regex) {
      setIsValid(regex.test(newValue));
    }

    onChange?.(newValue);
  };

  return (
    <Box>
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none" color="gray.500">
            {icon}
          </InputLeftElement>
        )}

        {isTextArea ? (
          <Textarea
            id={id}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            focusBorderColor={isValid ? "parcelColor2" : "red.500"}
            bg="inputBgColor"
            disabled={isDisabled}
            borderRadius="md"
            borderWidth="1px"
            borderColor={isValid ? "darkColor" : "red.500"}
            py={2}
            px={3}
          />
        ) : (
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
        )}
      </InputGroup>

      {!isValid && (
        <Text mt={2} ml={2} fontSize="md" color="accentColor">
          {regexErrorText}
        </Text>
      )}
    </Box>
  );
}
