import FormOvertimeHours from "@/components/OvertimeHours/FormOvertimeHours";
import { createFileRoute } from "@tanstack/react-router";
import UiBackButton from "@/components/ui/UiBackButton";
import { useState } from "react";
import type { OvertimeHoursResponseSchema } from "@/utils/schemas/overtime-hours";
import OvertimeHoursResultCard from "@/components/OvertimeHours/OvertimeHoursResultCard";

export const Route = createFileRoute("/horas-extras")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<OvertimeHoursResponseSchema | null>(
    null,
  );
  return (
    <div className="min-h-screen flex flex-col">
      <div className="items-top p-2 lg:p-10">
        <UiBackButton />
      </div>

      <div className="lg:mt-24 flex flex-col justify-center items-center">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-2 lg:mb-6">
          Calculadora de horas extras
        </h1>
        <div className="mb-14">
          <FormOvertimeHours onSuccess={setResult} />
        </div>
        {result && <OvertimeHoursResultCard data={result} />}
      </div>
    </div>
  );
}
