import { OvertimeHoursInput } from "@/schemas/overtime-hours.schema";

export function overtimeHoursCalc(input: OvertimeHoursInput) {
  const { grossSalary, monthlyWorkHours, overtimeHours } = input;

  const dailySalary = grossSalary / monthlyWorkHours;

  const overtimeHoursPay = {
    daily: dailySalary * overtimeHours.daily * 1.5,
    night: dailySalary * overtimeHours.night * 1.7,
    holiday: dailySalary * overtimeHours.holiday * 2,
    holidayAndNight: dailySalary * overtimeHours.holidayAndNight * 2.2,
  };

  const totalOvertimeHoursPay =
    overtimeHoursPay.daily +
    overtimeHoursPay.night +
    overtimeHoursPay.holiday +
    overtimeHoursPay.holidayAndNight;

  return {
    overtimeHoursPay,
    totalOvertimeHoursPay,
    ...input,
  };
}
