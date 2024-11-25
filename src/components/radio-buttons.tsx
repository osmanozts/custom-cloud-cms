import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type RadioButtonsProps = {
  id?: string;
  options: { value: string; label?: string }[];
  value: string;
  onChange: (value: string) => void;
};

export function RadioButtons({
  id,
  options,
  value,
  onChange,
}: RadioButtonsProps) {
  return (
    <RadioGroup id={id} onChange={onChange} value={value}>
      <Stack direction="row">
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            colorScheme="dark"
            _checked={{
              bg: "darkColor",
              color: "white",
              borderColor: "darkColor",
            }}
            _hover={{
              bg: "darkColor",
              color: "white",
            }}
          >
            {option.label ?? option.value}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
