import {
  OvertimeHoursInput,
  OvertimeHoursOutput,
} from "@/schemas/overtime-hours.schema";
import { applyCLTDeductions } from "@/utils/deductions";
import { formatNumberDecimals } from "@/utils/formatNumberDecimals";

export function overtimeHoursCalc(
  input: OvertimeHoursInput,
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

  const totalOvertimeHoursGrossPayWithSalary =
    overtimeHoursPay.daily +
    overtimeHoursPay.night +
    overtimeHoursPay.holiday +
    overtimeHoursPay.holidayAndNight +
    grossSalary;

  const { inss, irrf, net } = applyCLTDeductions(
    totalOvertimeHoursGrossPayWithSalary,
  );

  return {
    overtimeHoursPay: {
      daily: formatNumberDecimals(overtimeHoursPay.daily),
      night: formatNumberDecimals(overtimeHoursPay.night),
      holiday: formatNumberDecimals(overtimeHoursPay.holiday),
      holidayAndNight: formatNumberDecimals(overtimeHoursPay.holidayAndNight),
    },
    totalOvertimeHoursGrossPay: formatNumberDecimals(
      totalOvertimeHoursGrossPay,
    ),
    totalOvertimeHoursGrossPayWithSalary: formatNumberDecimals(
      totalOvertimeHoursGrossPayWithSalary,
    ),
    totalOvertimeHoursNetPayWithSalary: formatNumberDecimals(net),
    inssDeduction: inss,
    irrfDeduction: irrf,
    ...input,
  };
}
