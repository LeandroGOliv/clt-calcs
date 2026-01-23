import { MINIMUM_WAGE } from "@/config/constants";
import z from "zod";

export const thirteenthSalaryInputSchema = z.object({
  grossSalary: z
    .number()
    .min(MINIMUM_WAGE, `Salário deve ser no mínimo R$ ${MINIMUM_WAGE}`)
    .positive()
    .nonoptional(),
  monthsWorked: z.number().min(1).positive().nonoptional(),
  numberOfInstallments: z.number().min(1).max(2).positive().nonoptional(),
});

export const thirteenthSalaryOutputSchema = thirteenthSalaryInputSchema.extend({
  firstInstallment: z.number().nonnegative().nonoptional(),
  secondInstallment: z.number().nonnegative(),
  thirteenthSalaryTotal: z.number().nonnegative().nonoptional(),
});

export type ThirteenthSalaryInputSchema = z.infer<
  typeof thirteenthSalaryInputSchema
>;
export type ThirteenthSalaryOutputSchema = z.infer<
  typeof thirteenthSalaryOutputSchema
>;
