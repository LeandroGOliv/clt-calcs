import { VacationInputSchema } from "@/schemas/vacation.schema";

export function vacationCalc(input: VacationInputSchema) {
  // PASSAR PRA INGLES
  // VER SE PRECISO RETORNAR ALGO A MAIS PRA EXIBIR
  // FALTA DESCONTOS
  // PESQUISAR SE DEVO RETORNAR NUMBER MESMO PADRAOZAO OU JA FORMATADO COM R$ E ETC
  const { salarioBruto, venderFerias } = input;
  const feriasBase = salarioBruto + salarioBruto / 3;
  if (venderFerias) {
    const salarioDia = salarioBruto / 30;
    const valorVendaFerias = salarioDia * 10;
    return feriasBase + valorVendaFerias + valorVendaFerias / 3;
  }

  return feriasBase;
}
