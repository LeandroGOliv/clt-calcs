import { SALARIO_MINIMO } from "@/config/constants";
import z from "zod";

export const vacationInputSchema = z
  .object({
    salarioBruto: z
      .number()
      .min(SALARIO_MINIMO, `Salário deve ser no mínimo R$ ${SALARIO_MINIMO}`)
      .positive("Salário deve ser positivo"),
    venderFerias: z.boolean(),
    quantidadeDias: z
      .number()
      .int("Quantidade de dias deve ser um número inteiro")
      .min(5, "Mínimo de 5 dias de férias")
      .max(30, `Máximo de 30 dias de férias`),
    mediaValoresExtras: z
      .number()
      .nonnegative("Valores extras não podem ser negativos")
      .default(0),
  })
  .refine(
    (data) => {
      if (data.venderFerias && data.quantidadeDias < 20) {
        return false;
      }
      return true;
    },
    {
      message: "Para vender férias, é necessário gozar no mínimo 20 dias",
      path: ["quantidadeDias"],
    }
  );

export const vacationOutputSchema = z.object({
  salarioFerias: z.number().nonnegative(),
  tercoFerias: z.number().nonnegative(),
  valorAbono: z.number().nonnegative(),
  tercoAbono: z.number().nonnegative(),
  total: z.number().nonnegative().nonoptional(),
});

export type VacationInputSchema = z.infer<typeof vacationInputSchema>;
export type VacationOutputSchema = z.infer<typeof vacationOutputSchema>;
