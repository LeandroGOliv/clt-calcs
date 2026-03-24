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

  // ✅ CLT: sempre 30 dias
  const dailySalary = baseSalary / 30;

  // ✅ Férias gozadas
  const vacationPay = dailySalary * vacationDays;
  const vacationBonus = vacationPay / 3;

  // ✅ Abono (venda de 10 dias)
  const vacationSellValue = sellVacationDays ? dailySalary * 10 : 0;
  const vacationSellBonus = sellVacationDays ? vacationSellValue / 3 : 0;

  // ✅ Total bruto
  const totalVacationGrossPay =
    vacationPay + vacationBonus + vacationSellValue + vacationSellBonus;

  // ✅ INSS só sobre parte salarial
  const inssBase = vacationPay + vacationBonus;
  const inss = calcINSS(inssBase);

  // ✅ IRRF sobre total (prática de mercado)
  const irrfBase = totalVacationGrossPay - inss;
  const irrf = calcIRRF(irrfBase);

  // ✅ Líquido final
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
