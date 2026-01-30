import {
  VacationInputSchema,
  VacationOutputSchema,
} from "@/schemas/vacation.schema";
import { applyCLTDeductions } from "@/utils/deductions";
import { formatNumberDecimals } from "@/utils/formatNumberDecimals";

export function vacationCalc(input: VacationInputSchema): VacationOutputSchema {
  const { grossSalary, sellVacationDays, vacationDays, averageExtraEarnings } =
    input;

  const dailySalary =
    (grossSalary + (averageExtraEarnings ?? 0)) / vacationDays;
  const vacationPay = dailySalary * vacationDays;

  const vacationBonus = vacationPay / 3;

  const vacationSellValue = sellVacationDays ? dailySalary * 10 : 0;
  const vacationSellBonus = sellVacationDays ? vacationSellValue / 3 : 0;

  const totalVacationGrossPay =
    vacationPay + vacationBonus + vacationSellValue + vacationSellBonus;

  const { inss, irrf, net } = applyCLTDeductions(totalVacationGrossPay);

  return {
    vacationPay: formatNumberDecimals(vacationPay),
    vacationBonus: formatNumberDecimals(vacationBonus),
    vacationSellValue: formatNumberDecimals(vacationSellValue),
    vacationSellBonus: formatNumberDecimals(vacationSellBonus),
    totalVacationGrossPay: formatNumberDecimals(totalVacationGrossPay),
    inssDeduction: inss,
    irrfDeduction: irrf,
    totalVacationNetPay: net,
    ...input,
  };
}
