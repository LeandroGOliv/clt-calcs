import { createFileRoute } from "@tanstack/react-router";
import HomeCard from "../components/HomeCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>CLT-Calcs</h1>
      <HomeCard />
    </div>
  );
}
