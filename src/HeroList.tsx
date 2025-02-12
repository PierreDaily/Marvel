import { useQuery } from "@tanstack/react-query";
import { useCaseGetHeros } from "./useCase";

export function HeroList() {
  const query = useQuery({ queryKey: ["comics"], queryFn: useCaseGetHeros });
  return (
    <ul>
      {query.data?.map((comic) => (
        <li key={comic.id}>{comic.name}</li>
      ))}
    </ul>
  );
}
