import {
  thirteenthSalarySchema,
  type ThirteenthSalaryResponseSchema,
  type ThirteenthSalarySchema,
} from "@/utils/schemas/thirteenth-salary";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import services from "@/services";
import { toaster } from "../ui/toaster";

export default function FormThirteenthSalary() {
  const [isPending, setIsPending] = useState(false);
  const [calcResult, setCalcResult] =
    useState<ThirteenthSalaryResponseSchema>();

  const methods = useForm<ThirteenthSalarySchema>({
    resolver: zodResolver(thirteenthSalarySchema),
    defaultValues: {
      grossSalary: 0,
      monthsWorked: 1,
      numberOfInstallments: 1,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (form: ThirteenthSalarySchema) => {
      setIsPending(true);
      return services.thirteenthSalary.calculate(form);
    },
    onSuccess: async (response) => {
      toaster.create({
        description: "13º Salário calculado com sucesso!",
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

  function onFormSubmit(e: ThirteenthSalarySchema) {
    mutate(e);
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}></form>
      </FormProvider>
      {calcResult}
    </>
  );
}
