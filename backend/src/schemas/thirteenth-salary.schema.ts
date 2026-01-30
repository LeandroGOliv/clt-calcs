import { MINIMUM_WAGE } from "@/config/constants";
import z from "zod";

export const thirteenthSalaryInputSchema = z.object({
  grossSalary: z
    .number()
    .min(MINIMUM_WAGE, `Salário deve ser no mínimo R$ ${MINIMUM_WAGE}`),

  monthsWorked: z.number().int().min(1).max(12),
  numberOfInstallments: z.number().positive(),
});

export const thirteenthSalaryOutputSchema = thirteenthSalaryInputSchema.extend({
  thirteenthSalaryGrossTotal: z.number().positive(),
  firstInstallmentGross: z.number().nonnegative(),
  firstInstallmentNet: z.number().nonnegative(),
  firstInstallmentINSSDeduction: z.number().nonnegative(),
  firstInstallmentIRRFDeduction: z.number().nonnegative(),
  secondInstallmentGross: z.number().nonnegative(),
  secondInstallmentNet: z.number().nonnegative(),
  secondInstallmentINSSDeduction: z.number().nonnegative(),
  secondInstallmentIRRFDeduction: z.number().nonnegative(),
});

export type ThirteenthSalaryInputSchema = z.infer<
  typeof thirteenthSalaryInputSchema
>;
export type ThirteenthSalaryOutputSchema = z.infer<
  typeof thirteenthSalaryOutputSchema
>;
