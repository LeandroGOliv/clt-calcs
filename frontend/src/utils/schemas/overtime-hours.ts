import z from "zod";

export const overtimeHoursSchema = z.object({
  grossSalary: z
    .number()
    .min(1621, `Salário deve ser no mínimo R$ ${1621}`)
    .positive(),
  monthlyWorkHours: z
    .number()
    .min(1)
    .max(
      220,
      `O limite de horas mensais é de 220 horas
      `,
    ),
  overtimeHours: z.object({
    daily: z.number().nonnegative(),
    night: z.number().nonnegative(),
    holiday: z.number().nonnegative(),
    holidayAndNight: z.number().nonnegative(),
  }),
});

export type OvertimeHoursSchema = z.infer<typeof overtimeHoursSchema>;

export const overtimeHoursResponseSchema = overtimeHoursSchema.extend({
  overtimeHoursPay: z.object({
    daily: z.number().nonnegative(),
    night: z.number().nonnegative(),
    holiday: z.number().nonnegative(),
    holidayAndNight: z.number().nonnegative(),
  }),
  totalOvertimeHoursGrossPay: z.number().positive(),
  inssDeduction: z.number(),
  irrfDeduction: z.number(),
  totalOvertimeHoursNetPay: z.number(),
});

export type OvertimeHoursResponseSchema = z.infer<
  typeof overtimeHoursResponseSchema
>;
