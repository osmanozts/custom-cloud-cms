import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  onChange: (value: string) => void;
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={isPasswordField ? "password" : "text"}
        focusBorderColor="blue.500"
        bg="white"
        _hover={{
          bg: "white",
        }}
        _focus={{
          bg: "white",
        }}
        disabled={isDisabled}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.300"
        py={2}
        px={3}
      />
    </InputGroup>
  );
}
