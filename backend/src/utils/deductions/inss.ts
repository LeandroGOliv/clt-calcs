type INSSBracket = {
  limit: number;
  rate: number;
};

//  Faixa salarial (R$)	Alíquota (%) - 27/01/2026
// Até R$ 1.621,00	7,5%
// De R$ 1.621,01 até R$ 2.902,84	9%
// De R$ 2.902,85 até R$ 4.354,27	12%
// De R$ 4.354,28 até R$ 8.475,55	14% (teto)

const INSS_TABLE: INSSBracket[] = [
  { limit: 1621.0, rate: 0.075 },
  { limit: 2902.84, rate: 0.09 },
  { limit: 4354.27, rate: 0.12 },
  { limit: 8475.55, rate: 0.14 },
];

export default function calcINSS(gross: number) {
  let remaining = gross;
  let previousLimit = 0;
  let total = 0;

  for (const bracket of INSS_TABLE) {
    const taxable = Math.min(bracket.limit - previousLimit, remaining);

    if (remaining === 0) return;

    remaining -= taxable;
    previousLimit = bracket.limit;
    total += total * bracket.rate;
  }

  return Number(total.toFixed(2));
}
