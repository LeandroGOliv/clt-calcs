import { vacationSchema, type VacationSchema } from "@/utils/schemas/vacation";
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
  const methods = useForm({
    resolver: zodResolver(vacationSchema),
    defaultValues: {
      grossSalary: 0,
      sellVacationDays: false,
      vacationDays: 0,
      averageExtraEarnings: 0,
    },
  });

  const {
    mutate,
    data: calcResult,
    isPending,
  } = useMutation({
    mutationFn: async (form: VacationSchema) => {
      return services.vacation.calculate(form);
    },
    onSuccess: () => {
      toaster.create({
        description: "Férias calculadas com sucesso!",
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

  function onFormSubmit(e: VacationSchema) {
    mutate(e);
  }

  return (
    <div className="max-w-3xl w-full p-2">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="max-sm:col-span-12  col-span-7">
              <UiCurrencyInput
                name="grossSalary"
                label="Salário bruto:"
                id="grossSalary"
              />
            </div>
            <div className="max-sm:col-span-12 col-span-5">
              <UiNumberInput
                name="vacationDays"
                label="Dias de férias:"
                id="vacationDays"
                min={5}
                max={30}
                step={1}
              />
            </div>
            <div className="max-sm:col-span-12 col-span-7">
              <UiCurrencyInput
                name="averageExtraEarnings"
                label="Valor médio mensal de horas extras ou comissões:"
                id="averageExtraEarnings"
              />
            </div>
            <div className="col-span-12">
              <UICheckbox
                name="sellVacationDays"
                label="Vender férias (abono pecuniário)"
                id="sellVacationDays"
              />
            </div>
          </div>
          <Button
            loading={isPending}
            type="submit"
            variant="solid"
            className="w-full"
          >
            Calcular
          </Button>
        </form>
      </FormProvider>
      <pre>{JSON.stringify(calcResult, null, 2)}</pre>
    </div>
  );
}
