import {
  VacationInputSchema,
  VacationOutputSchema,
} from "@/schemas/vacation.schema";
import calcINSS from "@/utils/deductions/inss";
import calcIRRF from "@/utils/deductions/irrf";
import { formatNumberDecimals } from "@/utils/formatNumberDecimals";

export function vacationCalc(input: VacationInputSchema): VacationOutputSchema {
  const { grossSalary, sellVacationDays, vacationDays, averageExtraEarnings } =
    input;

  const baseSalary = grossSalary + (averageExtraEarnings ?? 0);

  const dailySalary = baseSalary / 30;

  const vacationPay = dailySalary * vacationDays;
  const vacationBonus = vacationPay / 3;

  const vacationSellValue = sellVacationDays ? dailySalary * 10 : 0;
  const vacationSellBonus = sellVacationDays ? vacationSellValue / 3 : 0;

  const totalVacationGrossPay =
    vacationPay + vacationBonus + vacationSellValue + vacationSellBonus;

  const inssBase = vacationPay + vacationBonus;
  const inss = calcINSS(inssBase);

  const irrfBase = totalVacationGrossPay - inss;
  const irrf = calcIRRF(irrfBase);

  const net = totalVacationGrossPay - inss - irrf;

  return {
    vacationPay: formatNumberDecimals(vacationPay),
    vacationBonus: formatNumberDecimals(vacationBonus),
    vacationSellValue: formatNumberDecimals(vacationSellValue),
    vacationSellBonus: formatNumberDecimals(vacationSellBonus),
    totalVacationGrossPay: formatNumberDecimals(totalVacationGrossPay),
    inssDeduction: formatNumberDecimals(inss),
    irrfDeduction: formatNumberDecimals(irrf),
    totalVacationNetPay: formatNumberDecimals(net),
    ...input,
  };
}
