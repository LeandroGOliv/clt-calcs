import services from "@/services";
import {
  overtimeHoursSchema,
  type OvertimeHoursResponseSchema,
  type OvertimeHoursSchema,
} from "@/utils/schemas/overtime-hours";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toaster } from "../ui/toaster";
import UiCurrencyInput from "../ui/Form/UiCurrencyInput";
import UiNumberInput from "../ui/Form/UiNumberInput";
import { Button } from "@chakra-ui/react";

type Props = {
  onSuccess: (data: OvertimeHoursResponseSchema) => void;
};

export default function FormOvertimeHours({ onSuccess }: Props) {
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (form: OvertimeHoursSchema) => {
      return services.overtimeHours.calculate(form);
    },
    onSuccess: (data) => {
      onSuccess(data);
      toaster.create({
        description: "Horas extras calculadas com sucesso!",
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

  function onFormSubmit(e: OvertimeHoursSchema) {
    mutate(e);
  }

  return (
    <div className="max-w-3xl w-full p-2">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="max-md:col-span-12 col-span-4">
              <UiCurrencyInput
                name="grossSalary"
                label="Salário bruto:"
                id="grossSalary"
              />
            </div>
            <div className="max-md:col-span-12 col-span-4">
              <UiNumberInput
                name="monthlyWorkHours"
                label="Carga horária mensal:"
                id="monthlyWorkHours"
              />
            </div>
            <div className="max-md:col-span-12 col-span-4">
              <UiNumberInput
                name="overtimeHours.daily"
                label="Horas extras normais:"
                id="daily"
              />
            </div>
            <div className="max-md:col-span-12 col-span-5">
              <UiNumberInput
                name="overtimeHours.holiday"
                label="Horas extras domingos e feriados:"
                id="holiday"
              />
            </div>
            <div className="max-md:col-span-12 col-span-5">
              <UiNumberInput
                name="overtimeHours.night"
                label="Horas extras noturnas:"
                id="night"
              />
            </div>
            <div className="max-md:col-span-12 col-span-5">
              <UiNumberInput
                name="overtimeHours.holidayAndNight"
                label="Horas extras noturnas em domingos e feriados:"
                id="holidayAndNight"
              />
            </div>
          </div>
          <div className="flex max-md:flex-col lg:justify-between w-full gap-2">
            <Button
              variant="outline"
              className="lg:flex-1"
              onClick={() => methods.reset()}
            >
              Limpar formulário
            </Button>
            <Button
              loading={isPending}
              type="submit"
              variant="solid"
              className="lg:flex-1"
            >
              Calcular
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
