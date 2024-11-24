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
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Neues Event
}

export function InputField({
  id,
  value,
  onChange,
  placeholder,
  icon,
  isPasswordField,
  isDisabled,
  onKeyDown,
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
        onKeyDown={onKeyDown} // Event weiterleiten
        placeholder={placeholder}
        type={isPasswordField ? "password" : "text"}
        focusBorderColor="parcelColor2"
        bg="inputBgColor"
        disabled={isDisabled}
        borderRadius="md"
        borderWidth="1px"
        borderColor="darkColor"
        py={2}
        px={3}
      />
    </InputGroup>
  );
}
