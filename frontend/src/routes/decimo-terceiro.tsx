import FormThirteenthSalary from "@/components/ThirteenthSalary/FormThirteenthSalary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/decimo-terceiro")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <FormThirteenthSalary />
    </>
  );
}
