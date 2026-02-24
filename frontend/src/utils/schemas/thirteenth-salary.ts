import z from "zod";

export const thirteenthSalarySchema = z.object({
  grossSalary: z.number().min(1621, `Salário deve ser no mínimo R$ ${1621}`),
  monthsWorked: z.number().int().min(1).max(12),
  numberOfInstallments: z.number().min(1).max(2),
});

export type ThirteenthSalarySchema = z.infer<typeof thirteenthSalarySchema>;

export const thirteenthSalaryResponseSchema = thirteenthSalarySchema.extend({
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

export type ThirteenthSalaryResponseSchema = z.infer<
  typeof thirteenthSalaryResponseSchema
>;
