import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputFieldProps {
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  isPasswordField?: boolean;
  onChange: (value: React.SetStateAction<string>) => void;
}

export function InputField({
  icon,
  value,
  onChange,
  placeholder,
  isPasswordField,
}: InputFieldProps) {
  return (
    <InputGroup marginBottom={4}>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
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
