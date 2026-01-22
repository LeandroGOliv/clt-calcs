import { MINIMUM_WAGE } from "@/config/constants";
import z from "zod";

const MAX_OVERTIME_HOURS = 220;

export const overtimeHoursInput = z.object({
  grossSalary: z
    .number()
    .min(MINIMUM_WAGE, `Salário deve ser no mínimo R$ ${MINIMUM_WAGE}`)
    .positive("Salário deve ser positivo"),
  monthlyWorkHours: z
    .number()
    .min(1)
    .max(
      MAX_OVERTIME_HOURS,
      `O limit6
      
      e de horas mensais é de ${MAX_OVERTIME_HOURS} horas`
    )
    .positive(),
  overtimeHours: z.object({
    daily: z.number().nonnegative(),
    night: z.number().nonnegative(),
    holiday: z.number().nonnegative(),
    holidayAndNight: z.number().nonnegative(),
  }),
});

export const overtimeHoursOutput = overtimeHoursInput.extend({
  overtimeHoursPay: z.object({
    daily: z.number().nonnegative(),
    night: z.number().nonnegative(),
    holiday: z.number().nonnegative(),
    holidayAndNight: z.number().nonnegative(),
  }),
  totalOvertimeHoursPay: z.number().nonnegative().nonoptional(),
});

export type OvertimeHoursInput = z.infer<typeof overtimeHoursInput>;
export type overtimeHoursOutput = z.infer<typeof overtimeHoursOutput>;
