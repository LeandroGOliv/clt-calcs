import {
  VacationInputSchema,
  VacationOutputSchema,
} from "@/schemas/vacation.schema";

export function vacationCalc(input: VacationInputSchema): VacationOutputSchema {
  const { grossSalary, sellVacationDays, vacationDays, averageExtraEarnings } =
    input;

  const dailySalary = (grossSalary + (averageExtraEarnings ?? 0)) / 30;
  const vacationPay = dailySalary * vacationDays;

  const vacationBonus = vacationPay / 3;

  const vacationSellValue = sellVacationDays ? dailySalary * 10 : 0;
  const vacationSellBonus = sellVacationDays ? vacationSellValue / 3 : 0;

  const totalVacationPay =
    vacationPay + vacationBonus + vacationSellValue + vacationSellBonus;

  return {
    vacationPay,
    vacationBonus,
    vacationSellValue,
    vacationSellBonus,
    totalVacationPay,
  };
}
