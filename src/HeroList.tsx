import { usePagination } from "./hook";

export function HeroList() {
  const pagination = usePagination({ limit: 50 });

  if (pagination.isLoading) return <div>Loading....</div>;

  if (pagination.isSuccess)
    return (
      <>
        <h1 className=" bg-red-500 font-noto font-bold text-9xl text-white tracking-tighter scale-y-150 p-8 mb-20">
          MARVEL Trombi
        </h1>
        <div className="flex justify-center gap-6 p-4">
          <button
            className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16  bg-red-500 font-noto -skew-x-12 font-bold"
            disabled={!pagination.hasPrev}
            onClick={pagination.prev}
          >
            prev
          </button>
          {pagination.hasNext &&
            pagination.activePage !== pagination.totalPageCount && (
              <button
                onClick={() => pagination.setPage(pagination.activePage + 1)}
                className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16  bg-red-500 font-noto -skew-x-12 font-bold"
              >
                {pagination.activePage + 1}
              </button>
            )}
          <button
            className="disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16  bg-red-500 font-noto -skew-x-12 font-bold"
            disabled={!pagination.hasNext}
            onClick={pagination.next}
          >
            Next
          </button>
        </div>

        <ul className="grid grid-cols-4 grid-flow-row gap-4 relative">
          {pagination.isPlaceholderData && (
            <div className="top-0 left-0 absolute w-full h-full bg-black opacity-50 z-20"></div>
          )}
          {pagination.data.map((heroe) => (
            <li
              key={heroe.id}
              className=" col-span-2 row-span-2 flex justify-center md:col-span-1 md:row-span-1 aspect-square"
            >
              <div className="relative w-full ">
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
                />
                <p
                  title={heroe.name}
                  className="rounded-tr-2xl absolute top-0 right-0 font-noto text-bold text-white md:text-base bg-gray-900 rounded-bl-lg p-1 opacity-90 text-xs whitespace-nowrap overflow-ellipsis max-w-3/4 overflow-hidden"
                >
                  {heroe.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );

  return <div>Impossible to load characters</div>;
}
