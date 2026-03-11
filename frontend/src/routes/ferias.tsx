import FormVacation from "@/components/Vacation/FormVacation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ferias")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="max-sm:text-xl text-3xl font-bold mb-6">
        Calculadora de férias
      </h1>
      <FormVacation />
    </div>
  );
}
