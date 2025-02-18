import { Button } from "./Button";
import { usePagination } from "./hook";

export function HeroList() {
  const pagination = usePagination({ limit: 40 });

  if (pagination.isLoading) return <div>Loading....</div>;

  if (pagination.isSuccess)
    return (
      <>
        <header className=" flex justify-center bg-red-600 h-32 items-center">
          <svg
            className="scale-175"
            width="130"
            height="52"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#FEFEFE"
              d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"
            ></path>
            <path fill="#e7000b" d="M0 0h30v52H0z"></path>
            <path
              fill="#FEFEFE"
              d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
            ></path>
          </svg>
        </header>

        <div className="flex justify-center gap-6 p-4">
          <Button disabled={!pagination.hasPrev} onClick={pagination.prev}>
            Prev
          </Button>
          {pagination.hasNext &&
            pagination.activePage !== pagination.totalPageCount && (
              <Button
                onClick={() => pagination.setPage(pagination.activePage + 1)}
              >
                {pagination.activePage + 1}
              </Button>
            )}
          <Button disabled={!pagination.hasNext} onClick={pagination.next}>
            Next
          </Button>
        </div>

        <ul className="grid grid-cols-4 grid-flow-row gap-4 relative px-4 md:px-6 xl:max-w-[1280px] mx-auto">
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

  return <div>Impossible to load characters</div>;
}
