import {
  thirteenthSalarySchema,
  type ThirteenthSalarySchema,
} from "@/utils/schemas/thirteenth-salary";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import services from "@/services";
import { toaster } from "../ui/toaster";
import UiNumberInput from "../ui/Form/UiNumberInput";
import UiCurrencyInput from "../ui/Form/UiCurrencyInput";
import { Button } from "@chakra-ui/react";

export default function FormThirteenthSalary() {
  const methods = useForm<ThirteenthSalarySchema>({
    resolver: zodResolver(thirteenthSalarySchema),
    defaultValues: {
      grossSalary: 0,
      monthsWorked: 1,
      numberOfInstallments: 1,
    },
  });

  const {
    mutate,
    data: calcResult,
    isPending,
  } = useMutation({
    mutationFn: async (form: ThirteenthSalarySchema) => {
      return services.thirteenthSalary.calculate(form);
    },
    onSuccess: () => {
      toaster.create({
        description: "13º Salário calculado com sucesso!",
        duration: 4000,
        type: "success",
      });
    },
    onError: (e: Error) => {
      toaster.create({
        description: e.message,
        type: "error",
      });
    },
  });

  function onFormSubmit(e: ThirteenthSalarySchema) {
    mutate(e);
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <UiCurrencyInput
            name="grossSalary"
            label="Salário bruto:"
            id="grossSalary"
          />
          <UiNumberInput
            name="monthsWorked"
            label="Meses trabalhados:"
            id="monthsWorked"
            min={1}
            max={12}
            step={1}
          />
          <UiNumberInput
            name="numberOfInstallments"
            label="Número de parcelas"
            id="numberOfInstallments"
            min={1}
            max={2}
            step={1}
          />
          <Button loading={isPending} type="submit" variant="solid">
            Calcular
          </Button>
        </form>
      </FormProvider>
      <pre>{JSON.stringify(calcResult, null, 2)}</pre>
    </>
  );
}
