import FormVacation from "@/components/Vacation/FormVacation";
import { createFileRoute } from "@tanstack/react-router";
import UiBackButton from "@/components/ui/UiBackButton";

export const Route = createFileRoute("/ferias")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="items-top py-5 px-2 lg:p-10">
        <UiBackButton />
      </div>

      <div className="lg:mt-24 flex flex-col justify-center items-center">
        <h1 className="max-sm:text-xl text-3xl font-bold mb-2 lg:mb-6">
          Calculadora de férias
        </h1>
        <FormVacation />
      </div>
    </div>
  );
}
