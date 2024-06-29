import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputFieldProps {
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  onChange: (value: React.SetStateAction<string> | string) => void;
}

export function InputField({
  icon,
  value,
  onChange,
  placeholder,
  isPasswordField,
  isDisabled,
}: InputFieldProps) {
  return (
    <InputGroup marginBottom={4}>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
        disabled={isDisabled}
        variant="outline"
        type={isPasswordField ? "password" : "email"}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        backgroundColor="white"
      />
    </InputGroup>
  );
}
