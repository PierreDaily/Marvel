import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getHerosUseCase } from "./useCase";
import { useState } from "react";

export function HeroList() {
  const [offset, setOffset] = useState(0);
  const limit = 50;
  const query = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["heroes", { offset, limit }],
    queryFn: () => getHerosUseCase({ offset, limit }),
  });

  if (query.isLoading) return <div>Loading....</div>;

  if (query.isSuccess) {
    const activePage = offset !== 0 ? offset / limit + 1 : 1;
    const totalPageCount = Number.isInteger(query.data.total / limit)
      ? query.data.total / limit
      : Math.ceil(query.data.total / limit);

    return (
      <>
        <h1>total pages: {totalPageCount}</h1>
        <h1>active page: {activePage}</h1>
        <button
          className="disabled:text-red-600"
          disabled={activePage === totalPageCount}
          onClick={() => {
            setOffset(offset + limit);
          }}
        >
          next
        </button>
        <button
          className="disabled:text-red-600"
          disabled={activePage === 1}
          onClick={() => {
            setOffset(offset - limit);
          }}
        >
          prev
        </button>

        <ul>
          {query.data?.data.map((comic) => (
            <li key={comic.id}>{comic.name}</li>
          ))}
        </ul>
      </>
    );
  }

  return <div>Impossible to load characters</div>;
}
