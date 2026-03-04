import services from "@/services";
import {
  overtimeHoursSchema,
  type OvertimeHoursResponseSchema,
  type OvertimeHoursSchema,
} from "@/utils/schemas/overtime-hours";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toaster } from "../ui/toaster";
import UiCurrencyInput from "../ui/Form/UiCurrencyInput";
import UiNumberInput from "../ui/Form/UiNumberInput";
import { Button } from "@chakra-ui/react";

export default function FormOvertimeHours() {
  const [isPending, setIsPending] = useState(false);
  const [calcResult, setCalcResult] = useState<OvertimeHoursResponseSchema>();

  const methods = useForm({
    resolver: zodResolver(overtimeHoursSchema),
    defaultValues: {
      grossSalary: 0,
      monthlyWorkHours: 0,
      overtimeHours: {
        daily: 0,
        night: 0,
        holiday: 0,
        holidayAndNight: 0,
      },
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (form: OvertimeHoursSchema) => {
      setIsPending(true);
      return services.overtimeHours.calculate(form);
    },
    onSuccess: async (response) => {
      toaster.create({
        description: "Horas extras calculadas com sucesso!",
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

  function onFormSubmit(e: OvertimeHoursSchema) {
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
            name="monthlyWorkHours"
            label="Carga horária mensal:"
            id="monthlyWorkHours"
          />
          <UiNumberInput
            name="overtimeHours.daily"
            label="Horas extras normais:"
            id="daily"
          />
          <UiNumberInput
            name="overtimeHours.holiday"
            label="Horas extras domingos e feriados:"
            id="holiday"
          />
          <UiNumberInput
            name="overtimeHours.night"
            label="Horas extras noturnas:"
            id="night"
          />
          <UiNumberInput
            name="overtimeHours.holidayAndNight"
            label="Horas extras noturnas em domingos e feriados:"
            id="holidayAndNight"
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
