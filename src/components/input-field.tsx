import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

export function InputField({
  id,
  value,
  onChange,
  placeholder,
  icon,
  isPasswordField,
  isDisabled,
}: InputFieldProps) {
  return (
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
        onChange={(event) =>
          onChange ? onChange(event.target.value) : undefined
        }
        placeholder={placeholder}
        type={isPasswordField ? "password" : "text"}
        focusBorderColor="blue.500"
        bg="inputBgColor"
        _hover={{
          bg: "inputBgColor",
        }}
        _focus={{
          bg: "inputBgColor",
        }}
        disabled={isDisabled}
        borderRadius="md"
        borderWidth="1px"
        borderColor="accentBorderColor"
        py={2}
        px={3}
      />
    </InputGroup>
  );
}
