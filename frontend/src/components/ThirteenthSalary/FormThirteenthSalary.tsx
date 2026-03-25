import {
  thirteenthSalarySchema,
  type ThirteenthSalaryResponseSchema,
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

type Props = {
  onSuccess: (data: ThirteenthSalaryResponseSchema) => void;
};

export default function FormThirteenthSalary({ onSuccess }: Props) {
  const methods = useForm<ThirteenthSalarySchema>({
    resolver: zodResolver(thirteenthSalarySchema),
    defaultValues: {
      grossSalary: 0,
      monthsWorked: 1,
      numberOfInstallments: 1,
      averageOfBonus: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (form: ThirteenthSalarySchema) => {
      return services.thirteenthSalary.calculate(form);
    },
    onSuccess: (data) => {
      onSuccess(data);
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
    <div className="max-w-3xl w-full p-2">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="col-span-8">
              <UiCurrencyInput
                name="grossSalary"
                label="Salário bruto:"
                id="grossSalary"
              />
            </div>
            <div className="max-md:col-span-12 col-span-4">
              <UiNumberInput
                name="monthsWorked"
                label="Meses trabalhados:"
                id="monthsWorked"
                min={1}
                max={12}
                step={1}
              />
            </div>
            <div className="max-sm:col-span-12 col-span-5">
              <UiNumberInput
                name="numberOfInstallments"
                label="Número de parcelas:"
                id="numberOfInstallments"
                min={1}
                max={2}
                step={1}
              />
            </div>
            <div className="max-sm:col-span-12 col-span-7">
              <UiCurrencyInput
                name="averageOfBonus"
                label="Valor médio de horas extras/comissões mensais:"
                id="averageOfBonus"
              />
            </div>
          </div>
          <div className="flex w-full">
            <Button
              loading={isPending}
              type="submit"
              variant="solid"
              className="w-full"
            >
              Calcular
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
