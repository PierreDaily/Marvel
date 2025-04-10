import { ReactElement } from "react";
import { Button } from "../button";
import { usePagination } from "./hook";

export function HeroList() {
  const pagination = usePagination({ limit: 40 });

  if (pagination.isLoading)
    return (
      <div className="flex justify-center items-center flex-col h-full grow transition-all">
        <div className="border-red-500 border-8 rounded-full w-8 h-8 border-b-0 animate-spin"></div>
      </div>
    );

  if (pagination.isSuccess) {
    const {
      activePage,
      data,
      hasNext,
      hasPrev,
      isPlaceholderData,
      next,
      prev,
      setPage,
      totalPageCount,
    } = pagination;

    const navBeforeActivePage: Array<ReactElement> = [];
    const navAfterActivePage: Array<ReactElement> = [];

    if (activePage > 1) {
      for (let i = activePage - 1; i !== 0 && activePage - i < 3; i -= 1) {
        navBeforeActivePage.push(
          <Button
            onClick={() => setPage(i)}
            key={i}
            className="hidden sm:block"
          >
            {i}
          </Button>
        );
      }
    }
    if (activePage < totalPageCount) {
      for (
        let i = activePage + 1;
        i !== totalPageCount && i - activePage < 3;
        i += 1
      ) {
        navAfterActivePage.push(
          <Button
            onClick={() => setPage(i)}
            key={i}
            className="hidden sm:block"
          >
            {i}
          </Button>
        );
      }
    }

    return (
      <>
        <div className="flex justify-center gap-6 p-4">
          <Button disabled={!hasPrev} onClick={prev}>
            Prev
          </Button>
          {navBeforeActivePage}

          <Button active>{activePage}</Button>

          {navAfterActivePage}
          <Button disabled={!hasNext} onClick={next}>
            Next
          </Button>
        </div>

        <ul className="grid grid-cols-4 grid-flow-row gap-4 relative px-4 md:px-6 xl:max-w-[1280px] mx-auto">
          {isPlaceholderData && (
            <div className="top-0 left-0 absolute w-full h-full bg-black opacity-50 z-20"></div>
          )}
          {data.map((heroe) => (
            <li
              key={heroe.id}
              className=" col-span-2 row-span-2 flex justify-center md:col-span-1 md:row-span-1 aspect-square"
            >
              <div className="relative w-full ">
                <img
                  loading="lazy"
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
  }

  return <div>Impossible to load characters</div>;
}
