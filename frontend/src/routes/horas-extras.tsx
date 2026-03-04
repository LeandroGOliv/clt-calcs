import FormOvertimeHours from "@/components/OvertimeHours/FormOvertimeHours";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/horas-extras")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <FormOvertimeHours />
    </>
  );
}
