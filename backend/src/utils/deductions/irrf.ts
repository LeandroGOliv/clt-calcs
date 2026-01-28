export default function calcIRRF(base: number): number {
  let irrf = 0;

  if (base <= 2428.8) {
    irrf = 0;
  } else if (base <= 2826.65) {
    irrf = base * 0.075 - 182.16;
  } else if (base <= 3751.05) {
    irrf = base * 0.15 - 394.16;
  } else if (base <= 4664.68) {
    irrf = base * 0.225 - 675.49;
  } else {
    irrf = base * 0.275 - 908.73;
  }

  // fonte:  https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/01/nova-tabela-do-ir-veja-faixas-e-aliquotas-e-saiba-mais-sobre-medida-que-isenta-o-pagamento-para-quem-ganha-ate-r-5-mil

  // FALTAM REDUÇÕES, entender como funcionam(ta no chat com gpt) e aplicar
  return Math.max(Number(irrf.toFixed(2)), 0);
}
