import { Controller, useFormContext } from "react-hook-form";
import { NumberInput } from "@chakra-ui/react";
import UiFormField from "./UiFormField";
import { useState } from "react";

type UiNumberInputProps = {
  name: string;
  label: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
};

export default function UiNumberInput({
  name,
  label,
  id,
  min,
  max,
  step,
}: UiNumberInputProps) {
  const { control } = useFormContext();
  const [value, setValue] = useState("0");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <UiFormField label={label} id={id} error={fieldState.error?.message}>
          <NumberInput.Root
            key={value}
            className="w-full"
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={(details) => {
              setValue(details.value);
              field.onChange(details.valueAsNumber);
            }}
          >
            <NumberInput.Control />
            <NumberInput.Input
              id={id}
              borderColor="var(--color-border)"
              _focus={{
                borderColor: "var(--color-border-focus)",
                boxShadow: "none",
              }}
            />
          </NumberInput.Root>
        </UiFormField>
      )}
    />
  );
}
