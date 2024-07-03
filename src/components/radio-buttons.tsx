import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type RadioButtonsProps = {
  id?: string;
  options: string[];
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
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
