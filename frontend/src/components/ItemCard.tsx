import { Link } from "@tanstack/react-router";

export default function ItemCard({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col h-46 w-46 bg-neutral-800 rounded-xl border-2 border-neutral-700 hover:bg-neutral-700 hover:cursor-pointer transition hover:duration-200"
    >
      <h3 className="text-lg font-bold px-4 pt-4 pb-2 group-hover:text-neutral-400  transition group-hover:duration-300">
        {title}
      </h3>
      <p className="text-sm px-4 text-neutral-200/50 group-hover:text-neutral-400/50 transition group-hover:duration-300">
        {description}
      </p>
    </Link>
  );
}
