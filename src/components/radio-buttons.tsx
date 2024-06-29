import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type RadioButtonsProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function RadioButtons({ options, value, onChange }: RadioButtonsProps) {
  return (
    <RadioGroup onChange={onChange} value={value}>
      <Stack direction="row">
        {options.map((opt) => (
          <Radio value={opt}>{opt}</Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
