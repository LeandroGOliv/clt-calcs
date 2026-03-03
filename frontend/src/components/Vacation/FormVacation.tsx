import { useState } from "react";
import {
  vacationSchema,
  type VacationResponseSchema,
  type VacationSchema,
} from "@/utils/schemas/vacation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import services from "@/services";
import { toaster } from "../ui/toaster";
import { Button } from "@chakra-ui/react";
import UiCurrencyInput from "../ui/Form/UiCurrencyInput";
import UiNumberInput from "../ui/Form/UiNumberInput";
import UICheckbox from "../ui/Form/UICheckbox";

export default function FormVacation() {
  const [isPending, setIsPending] = useState(false);
  const [calcResult, setCalcResult] = useState<VacationResponseSchema>();

  const methods = useForm({
    resolver: zodResolver(vacationSchema),
    defaultValues: {
      grossSalary: 0,
      sellVacationDays: false,
      vacationDays: 0,
      averageExtraEarnings: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (form: VacationSchema) => {
      setIsPending(true);
      return services.vacation.calculate(form);
    },
    onSuccess: async (response) => {
      toaster.create({
        description: "Férias calculadas com sucesso!",
        duration: 4000,
        type: "success",
      });

      setCalcResult(response);
      setIsPending(false);
    },
    onError: (e: Error) => {
      setIsPending(false);
      toaster.create({
        description: e.message,
        type: "error",
      });
    },
  });

  function onFormSubmit(e: VacationSchema) {
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
            name="vacationDays"
            label="Dias de férias:"
            id="vacationDays"
            min={5}
            max={30}
            step={1}
          />
          <UiCurrencyInput
            name="averageExtraEarnings"
            label="Valor médio mensal de horas extras ou comissões:"
            id="averageExtraEarnings"
          />
          <UICheckbox
            name="sellVacationDays"
            label="Vender férias (abono pecuniário)"
            id="sellVacationDays"
          />

          {/* tambem exibir o número de dias vendidos que é automatico 1/3 */}
          <Button loading={isPending} type="submit" variant="solid">
            Calcular
          </Button>
        </form>
      </FormProvider>
      <pre>{JSON.stringify(calcResult, null, 2)}</pre>
    </>
  );
}
