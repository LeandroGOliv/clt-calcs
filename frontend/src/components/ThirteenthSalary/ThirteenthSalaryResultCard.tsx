import type { ThirteenthSalaryResponseSchema } from "@/utils/schemas/thirteenth-salary";

type Props = {
  data: ThirteenthSalaryResponseSchema;
};

export default function ThirteenthSalaryResultCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-lg border border-primary/40 mb-14">
        <table className="w-full text-md">
          <tbody
            className="
          divide-y divide-primary/20
        "
          >
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2 text-center whitespace-nowrap">
                Descrição
              </td>
              <td className="px-4 py-2 border-l border-primary/20 text-center whitespace-nowrap">
                Proventos
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Salário bruto proporcional
              </td>
              <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap ">
                R$ {data.thirteenthSalaryGrossTotal}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Horas extras/Comissões
              </td>
              <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                R$ {data.bonusProportional}
              </td>
            </tr>
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2 text-center whitespace-nowrap">
                Total bruto
              </td>
              <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                R$ {data.thirteenthSalaryGrossTotalWithBonus}
              </td>
            </tr>

            {data.numberOfInstallments === 1 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Parcela única
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.firstInstallmentGross}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 1 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  INSS
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.firstInstallmentINSSDeduction}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 1 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  IRRF
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.firstInstallmentIRRFDeduction}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 1 && (
              <tr className="font-bold bg-(--color-secondary) ">
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Total líquido
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.firstInstallmentNet}
                </td>
              </tr>
            )}

            {data.numberOfInstallments === 2 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Primeira parcela
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.firstInstallmentNet}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 2 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Segunda parcela (bruto)
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.secondInstallmentGross}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 2 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  INSS
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.secondInstallmentINSSDeduction}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 2 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  IRRF
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.secondInstallmentIRRFDeduction}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 2 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Segunda parcela (liquído)
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.secondInstallmentNet}
                </td>
              </tr>
            )}
            {data.numberOfInstallments === 2 && (
              <tr className="font-bold bg-(--color-secondary) ">
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Total liquído
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R${" "}
                  {(
                    data.firstInstallmentGross + data.secondInstallmentNet
                  ).toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
