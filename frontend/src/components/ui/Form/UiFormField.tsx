import { Field } from "@chakra-ui/react";
import type { ReactNode } from "react";

export default function UiFormField({
  label,
  error,
  children,
  id,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <Field.Root invalid={!!error}>
      {label && <Field.Label htmlFor={id}>{label}</Field.Label>}

      {children}

      {error && (
        <Field.ErrorText w="full">
          <Field.ErrorIcon size="sm" />
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
}
