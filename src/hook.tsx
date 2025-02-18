import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getHerosUseCase } from "./useCase";
import { useState } from "react";

export function usePagination({
  page = 1,
  limit,
}: {
  page?: number;
  limit: number;
}) {
  const [offset, setOffset] = useState((page - 1) * limit);
  const query = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["heroes", { offset, limit }],
    queryFn: () => getHerosUseCase({ offset, limit }),
  });

  if (query.isLoading)
    return { isLoading: query.isLoading, isSuccess: query.isSuccess, data: [] };

  if (query.isSuccess) {
    const activePage = offset !== 0 ? offset / limit + 1 : 1;
    const totalPageCount = Number.isInteger(query.data.total / limit)
      ? query.data.total / limit
      : Math.ceil(query.data.total / limit);

    return {
      activePage,
      data: query.data?.data,
      hasNext: activePage !== totalPageCount,
      hasPrev: activePage !== 1,
      next: () => {
        setOffset(offset + limit);
      },
      prev: () => {
        setOffset(offset - limit);
      },
      totalPageCount,
      isLoading: query.isLoading,
      setPage: (page: number) => {
        setOffset((page - 1) * limit);
      },
      isPlaceholderData: query.isPlaceholderData,
      isSuccess: query.isSuccess,
    };
  }
  return { isLoading: query.isLoading, isSuccess: query.isSuccess, data: [] };
}
