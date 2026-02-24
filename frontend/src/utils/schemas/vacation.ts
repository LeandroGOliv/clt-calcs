import z from "zod";

export const vacationSchema = z
  .object({
    grossSalary: z
      .number()
      .min(1621, `Salário deve ser no mínimo R$ 1621,`)
      .nonoptional(),
    sellVacationDays: z.boolean().nonoptional(),
    vacationDays: z
      .number()
      .int()
      .min(5, "Mínimo de 5 dias de férias")
      .max(30, `Máximo de 30 dias de férias`)
      .nonoptional(),
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
    },
  );

export type VacationSchema = z.infer<typeof vacationSchema>;

export const vacationResponseSchema = vacationSchema.extend({
  vacationPay: z.number().positive(),
  vacationBonus: z.number().nonnegative(),
  vacationSellValue: z.number().nonnegative(),
  vacationSellBonus: z.number().nonnegative(),
  totalVacationGrossPay: z.number().positive(),
  inssDeduction: z.number(),
  irrfDeduction: z.number(),
  totalVacationNetPay: z.number(),
});

export type VacationResponseSchema = z.infer<typeof vacationResponseSchema>;
