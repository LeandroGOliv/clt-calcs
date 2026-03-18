import type { OvertimeHoursResponseSchema } from "@/utils/schemas/overtime-hours";

type Props = {
  data: OvertimeHoursResponseSchema;
};

export default function OvertimeHoursResultCard({ data }: Props) {
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
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap">
                Horas extras
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                Salário + HE
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Horas extras diurnas
              </td>
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap ">
                R$ {data.overtimeHoursPay.daily}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap ">
                R$ {data.overtimeHoursPay.daily}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Horas extras noturnas
              </td>
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.night}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.night}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Horas extras domingos e feriados
              </td>
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.holiday}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.holiday}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-center whitespace-nowrap">
                Horas extras domingos e feriados noturnos
              </td>
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.holidayAndNight}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.overtimeHoursPay.holidayAndNight}
              </td>
            </tr>
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2 text-center whitespace-nowrap">
                Total bruto
              </td>
              <td className="px-4 py-2 border-l border-r border-primary/20 text-center whitespace-nowrap">
                R$ {data.totalOvertimeHoursGrossPay}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                falta retornar
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold border-r border-primary/20 text-center whitespace-nowrap">
                INSS
              </td>
              <td></td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.inssDeduction}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold border-r border-primary/20 text-center whitespace-nowrap ">
                IRRF
              </td>
              <td></td>
              <td className="px-4 py-2 text-center whitespace-nowrap ">
                R$ {data.irrfDeduction}
              </td>
            </tr>
            <tr className="font-bold bg-(--color-secondary) ">
              <td className="px-4 py-2 border-r border-primary/20 text-center whitespace-nowrap">
                Total liquído
              </td>
              <td></td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                R$ {data.totalOvertimeHoursNetPay}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
