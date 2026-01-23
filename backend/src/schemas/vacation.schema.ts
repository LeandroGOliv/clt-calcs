import { MINIMUM_WAGE } from "@/config/constants";
import z from "zod";

export const vacationInputSchema = z
  .object({
    grossSalary: z
      .number()
      .min(MINIMUM_WAGE, `Salário deve ser no mínimo R$ ${MINIMUM_WAGE}`)
      .positive("Salário deve ser positivo"),
    sellVacationDays: z.boolean(),
    vacationDays: z
      .number()
      .int("Quantidade de dias deve ser um número inteiro")
      .min(5, "Mínimo de 5 dias de férias")
      .max(30, `Máximo de 30 dias de férias`),
    averageExtraEarnings: z
      .number()
      .nonnegative("Valores extras não podem ser negativos")
      .default(0),
  })
  .refine(
    (data) => {
      if (data.sellVacationDays && data.vacationDays < 20) {
        return false;
      }
      return true;
    },
    {
      message: "Para vender férias, é necessário gozar no mínimo 20 dias",
      path: ["vacationDays"],
    }
  );

export const vacationOutputSchema = vacationInputSchema.extend({
  vacationPay: z.number().nonnegative(),
  vacationBonus: z.number().nonnegative(),
  vacationSellValue: z.number().nonnegative(),
  vacationSellBonus: z.number().nonnegative(),
  totalVacationPay: z.number().nonnegative().nonoptional(),
});

export type VacationInputSchema = z.infer<typeof vacationInputSchema>;
export type VacationOutputSchema = z.infer<typeof vacationOutputSchema>;
