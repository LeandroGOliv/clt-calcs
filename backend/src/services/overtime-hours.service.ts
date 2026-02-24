import {
  OvertimeHoursInput,
  OvertimeHoursOutput,
} from "@/schemas/overtime-hours.schema";
import { applyCLTDeductions } from "@/utils/deductions";

export function overtimeHoursCalc(
  input: OvertimeHoursInput
): OvertimeHoursOutput {
  const { grossSalary, monthlyWorkHours, overtimeHours } = input;

  const dailySalary = grossSalary / monthlyWorkHours;

  const overtimeHoursPay = {
    daily: dailySalary * overtimeHours.daily * 1.5,
    night: dailySalary * overtimeHours.night * 1.7,
    holiday: dailySalary * overtimeHours.holiday * 2,
    holidayAndNight: dailySalary * overtimeHours.holidayAndNight * 2.2,
  };

  const totalOvertimeHoursGrossPay =
    overtimeHoursPay.daily +
    overtimeHoursPay.night +
    overtimeHoursPay.holiday +
    overtimeHoursPay.holidayAndNight;

  const { inss, irrf, net } = applyCLTDeductions(totalOvertimeHoursGrossPay);

  return {
    overtimeHoursPay,
    totalOvertimeHoursGrossPay,
    inssDeduction: inss,
    irrfDeduction: irrf,
    totalOvertimeHoursNetPay: net,
    ...input,
  };
}
