import { Controller, useFormContext } from "react-hook-form";
import UiFormField from "./UiFormField";
import { Checkbox } from "@chakra-ui/react";

type UICheckboxProps = {
  name: string;
  label: string;
  id: string;
};

export default function UICheckbox({ name, label, id }: UICheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <UiFormField label="" id={id} error={fieldState.error?.message}>
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={({ checked }) => field.onChange(checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{label}</Checkbox.Label>
          </Checkbox.Root>
        </UiFormField>
      )}
    ></Controller>
  );
}
