import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/horas-extras")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/horas-extras"!</div>;
}
