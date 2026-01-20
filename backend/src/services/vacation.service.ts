import {
  VacationInputSchema,
  VacationOutputSchema,
} from "@/schemas/vacation.schema";

export function vacationCalc(input: VacationInputSchema): VacationOutputSchema {
  const { salarioBruto, venderFerias, quantidadeDias, mediaValoresExtras } =
    input;

  const salarioDia = (salarioBruto + (mediaValoresExtras ?? 0)) / 30;
  const salarioFerias = salarioDia * quantidadeDias;

  const tercoFerias = salarioFerias / 3;

  const valorAbono = venderFerias ? salarioDia * 10 : 0;
  const tercoAbono = venderFerias ? valorAbono / 3 : 0;

  const total = salarioFerias + tercoFerias + valorAbono + tercoAbono;

  return { salarioFerias, tercoFerias, valorAbono, tercoAbono, total };
}
