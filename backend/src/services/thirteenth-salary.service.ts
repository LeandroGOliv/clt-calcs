import {
  ThirteenthSalaryInputSchema,
  ThirteenthSalaryOutputSchema,
} from "@/schemas/thirteenth-salary.schema";
import { applyCLTDeductions } from "@/utils/deductions";
import { formatNumberDecimals } from "@/utils/formatNumberDecimals";

export function thirteenthSalaryCalc(
  input: ThirteenthSalaryInputSchema,
): ThirteenthSalaryOutputSchema {
  const { grossSalary, monthsWorked, numberOfInstallments, averageOfBonus } =
    input;

  const thirteenthSalaryGrossTotal = grossSalary * (monthsWorked / 12);

  const bonusProportional = averageOfBonus * (monthsWorked / 12);

  const thirteenthSalaryGrossTotalWithBonus =
    thirteenthSalaryGrossTotal + bonusProportional;

  const { inss: totalINSS, irrf: totalIRRF } = applyCLTDeductions(
    thirteenthSalaryGrossTotalWithBonus,
  );

  let firstInstallmentGross = 0;
  let secondInstallmentGross = 0;

  let firstInstallmentNet = 0;
  let secondInstallmentNet = 0;

  let firstInstallmentINSSDeduction = 0;
  let firstInstallmentIRRFDeduction = 0;
  let secondInstallmentINSSDeduction = 0;
  let secondInstallmentIRRFDeduction = 0;

  if (numberOfInstallments === 2) {
    // 1ª parcela — sem descontos
    firstInstallmentGross = thirteenthSalaryGrossTotalWithBonus / 2;
    firstInstallmentNet = firstInstallmentGross;

    // 2ª parcela — com todos os descontos
    secondInstallmentGross = thirteenthSalaryGrossTotalWithBonus / 2;
    secondInstallmentINSSDeduction = totalINSS;
    secondInstallmentIRRFDeduction = totalIRRF;
    secondInstallmentNet = secondInstallmentGross - totalINSS - totalIRRF;
  } else {
    // Parcela única — recebe todos os descontos
    firstInstallmentGross = thirteenthSalaryGrossTotalWithBonus;
    firstInstallmentINSSDeduction = totalINSS;
    firstInstallmentIRRFDeduction = totalIRRF;
    firstInstallmentNet = firstInstallmentGross - totalINSS - totalIRRF;
  }

  return {
    thirteenthSalaryGrossTotal: formatNumberDecimals(
      thirteenthSalaryGrossTotal,
    ),
    firstInstallmentGross: formatNumberDecimals(firstInstallmentGross),
    firstInstallmentNet: formatNumberDecimals(firstInstallmentNet),
    firstInstallmentINSSDeduction: formatNumberDecimals(
      firstInstallmentINSSDeduction,
    ),
    firstInstallmentIRRFDeduction: formatNumberDecimals(
      firstInstallmentIRRFDeduction,
    ),
    secondInstallmentGross: formatNumberDecimals(secondInstallmentGross),
    secondInstallmentNet: formatNumberDecimals(secondInstallmentNet),
    secondInstallmentINSSDeduction: formatNumberDecimals(
      secondInstallmentINSSDeduction,
    ),
    secondInstallmentIRRFDeduction: formatNumberDecimals(
      secondInstallmentIRRFDeduction,
    ),
    thirteenthSalaryGrossTotalWithBonus: formatNumberDecimals(
      thirteenthSalaryGrossTotalWithBonus,
    ),
    bonusProportional: formatNumberDecimals(bonusProportional),
    ...input,
  };
}
