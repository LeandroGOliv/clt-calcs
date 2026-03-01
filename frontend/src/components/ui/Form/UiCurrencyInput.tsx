import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "@chakra-ui/react";
import UiFormField from "./UiFormField";

type UiCurrencyInputProps = {
  name: string;
  label: string;
  id: string;
};

export default function UiCurrencyInput({
  name,
  label,
  id,
}: UiCurrencyInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <UiFormField label={label} id={id} error={fieldState.error?.message}>
          <NumericFormat
            value={field.value ?? ""}
            onValueChange={(values) => {
              field.onChange(values.floatValue ?? 0);
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            customInput={Input}
            id={id}
            variant="outline"
            borderColor="var(--color-border)"
            _focus={{
              borderColor: "var(--color-border-focus)",
            }}
          />
        </UiFormField>
      )}
    />
  );
}
