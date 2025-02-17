import { usePagination } from "./hook";

export function HeroList() {
  const pagination = usePagination({ limit: 50 });

  if (pagination.isLoading) return <div>Loading....</div>;

  if (pagination.isSuccess)
    return (
      <>
        <h1>total pages: {pagination.totalPageCount}</h1>
        <h1>active page: {pagination.activePage}</h1>
        <button
          className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16 rounded-xl bg-black"
          disabled={!pagination.hasPrev}
          onClick={pagination.prev}
        >
          prev
        </button>
        {pagination.hasNext &&
          pagination.activePage !== pagination.totalPageCount && (
            <button
              onClick={() => pagination.setPage(pagination.activePage + 1)}
              className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16 rounded-xl bg-black"
            >
              {pagination.activePage + 1}
            </button>
          )}
        <button
          className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16 rounded-xl bg-black"
          disabled={!pagination.hasNext}
          onClick={pagination.next}
        >
          Next
        </button>

        <ul className="grid grid-cols-4 grid-rows-4 gap-4">
          {pagination.data.map((comic) => (
            <li
              key={comic.id}
              className="w-full col-span-1 row-span-1 flex justify-center"
            >
              <img
                className="w-48 h-48 object-cover rounded-2xl"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
            </li>
          ))}
        </ul>
      </>
    );

  return <div>Impossible to load characters</div>;
}
