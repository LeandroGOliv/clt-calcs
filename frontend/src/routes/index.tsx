import { createFileRoute } from "@tanstack/react-router";
import HomeCard from "../components/HomeCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <h1 className=" max-sm:text-3xl text-5xl font-bold mb-2">CLT Calcs</h1>
      <p className="max-sm:text-md text-lg mb-10">
        Tudo que você precisa pra entender seus ganhos na CLT, em poucos
        cliques.
      </p>
      <HomeCard />
    </div>
  );
}
