import ItemCard from "./ItemCard";

export default function HomeCard() {
  return (
    <div className="h-auto max-sm:w-72 md:w-lg rounded-md flex flex-col justify-center items-center gap-4">
      <div className="max-sm:flex-col flex justify-between gap-4">
        <ItemCard
          to="/ferias"
          title="Férias"
          description="Calcule quanto irá receber em suas férias"
        />
        <ItemCard
          to="/horas-extras"
          title="Horas extras"
          description="Calcule quanto irá receber por suas horas extras"
        />
      </div>
      <div className="flex max-sm:flex-col justify-between gap-4">
        <ItemCard
          to="/decimo-terceiro"
          title="13º Salário"
          description="Calcule qual será o valor do seu 13º salário"
        />
      </div>
    </div>
  );
}
