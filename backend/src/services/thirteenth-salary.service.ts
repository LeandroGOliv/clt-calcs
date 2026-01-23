import { ThirteenthSalaryInputSchema } from "@/schemas/thirteenth-salary.schema";

export function thirteenthSalaryCalc(input: ThirteenthSalaryInputSchema) {
  const { grossSalary, monthsWorked, numberOfInstallments } = input;

  const thirteenthSalaryTotal =
    numberOfInstallments === 2
      ? (grossSalary / 12) * monthsWorked
      : (grossSalary / 12) * monthsWorked; // NESSE CASO ENTRAM OS DESCONTOS TB, na verdade nao vai ser aqui ne, porque vou exibir o bruto tb...

  let firstInstallment = thirteenthSalaryTotal;
  let secondInstallment = 0;

  if (numberOfInstallments === 2) {
    firstInstallment = thirteenthSalaryTotal / 2;
    secondInstallment =
      numberOfInstallments === 2 ? thirteenthSalaryTotal / 2 : 0; // aqui vai subtrair descontos tambem
  }

  return {
    thirteenthSalaryTotal,
    firstInstallment,
    secondInstallment,
    ...input,
  };
}
