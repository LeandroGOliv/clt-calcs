import FormThirteenthSalary from "@/components/ThirteenthSalary/FormThirteenthSalary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/decimo-terceiro")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="max-sm:text-xl text-3xl font-bold mb-6">
        Calculadora de décimo terceiro salário
      </h1>
      <FormThirteenthSalary />
    </div>
  );
}
