import FormThirteenthSalary from "@/components/ThirteenthSalary/FormThirteenthSalary";
import { createFileRoute } from "@tanstack/react-router";
import UiBackButton from "@/components/ui/UiBackButton";
import ThirteenthSalaryResultCard from "@/components/ThirteenthSalary/ThirteenthSalaryResultCard";
import { useState } from "react";
import type { ThirteenthSalaryResponseSchema } from "@/utils/schemas/thirteenth-salary";

export const Route = createFileRoute("/decimo-terceiro")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<ThirteenthSalaryResponseSchema | null>(
    null
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="items-top py-5 px-2 lg:p-10">
        <UiBackButton />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-2 lg:mb-6">
          Calculadora de décimo terceiro salário
        </h1>

        <div className="mb-14">
          <FormThirteenthSalary onSuccess={setResult} />
        </div>
        {result && <ThirteenthSalaryResultCard data={result} />}
      </div>
    </div>
  );
}
