import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/decimo-terceiro")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/decimo-terceiro"!</div>;
}
