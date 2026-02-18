import calcINSS from "./inss";
import calcIRRF from "./irrf";

export function applyCLTDeductions(gross: number) {
  const inss = calcINSS(gross);
  const irrfBase = gross - inss;
  const irrf = calcIRRF(irrfBase);
  const net = gross - irrf - inss;

  return { inss, irrf, net };
}
