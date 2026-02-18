import {
  ThirteenthSalaryInputSchema,
  ThirteenthSalaryOutputSchema,
} from "@/schemas/thirteenth-salary.schema";
import { applyCLTDeductions } from "@/utils/deductions";

export function thirteenthSalaryCalc(
  input: ThirteenthSalaryInputSchema,
): ThirteenthSalaryOutputSchema {
  const { grossSalary, monthsWorked, numberOfInstallments } = input;

  const thirteenthSalaryGrossTotal = (grossSalary / 12) * monthsWorked;

  const { inss: totalINSS, irrf: totalIRRF } = applyCLTDeductions(
    thirteenthSalaryGrossTotal,
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
    firstInstallmentGross = thirteenthSalaryGrossTotal / 2;
    firstInstallmentNet = firstInstallmentGross;

    // 2ª parcela — com todos os descontos
    secondInstallmentGross = thirteenthSalaryGrossTotal / 2;
    secondInstallmentINSSDeduction = totalINSS;
    secondInstallmentIRRFDeduction = totalIRRF;
    secondInstallmentNet = secondInstallmentGross - totalINSS - totalIRRF;
  } else {
    // Parcela única — recebe todos os descontos
    firstInstallmentGross = thirteenthSalaryGrossTotal;
    firstInstallmentINSSDeduction = totalINSS;
    firstInstallmentIRRFDeduction = totalIRRF;
    firstInstallmentNet = firstInstallmentGross - totalINSS - totalIRRF;
  }

  return {
    thirteenthSalaryGrossTotal,
    firstInstallmentGross,
    firstInstallmentNet,
    firstInstallmentINSSDeduction,
    firstInstallmentIRRFDeduction,
    secondInstallmentGross,
    secondInstallmentNet,
    secondInstallmentINSSDeduction,
    secondInstallmentIRRFDeduction,
    ...input,
  };
}
