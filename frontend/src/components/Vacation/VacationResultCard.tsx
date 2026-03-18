import type { VacationResponseSchema } from "@/utils/schemas/vacation";

type Props = {
  data: VacationResponseSchema;
};

export default function VacationResultCard({ data }: Props) {
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
                Salário / Férias
              </td>
              <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap ">
                R$ {data.averageExtraEarnings + data.grossSalary}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                1/3 Férias
              </td>
              <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                R$ {data.vacationBonus}
              </td>
            </tr>
            {data.vacationSellValue > 0 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  Abono pecuniário
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.vacationSellValue}
                </td>
              </tr>
            )}
            {data.vacationSellBonus > 0 && (
              <tr>
                <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                  1/3 Abono pecuniário
                </td>
                <td className="px-4 py-2 border-l  border-primary/20 text-center whitespace-nowrap">
                  R$ {data.vacationSellBonus}
                </td>
              </tr>
            )}
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2 text-center whitespace-nowrap">
                Total bruto
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.totalVacationGrossPay}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold  border-primary/20 text-center whitespace-nowrap">
                INSS
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.inssDeduction}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold  border-primary/20 text-center whitespace-nowrap ">
                IRRF
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap ">
                R$ {data.irrfDeduction}
              </td>
            </tr>
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2  border-primary/20 text-center whitespace-nowrap">
                Total liquído
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.totalVacationNetPay}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
