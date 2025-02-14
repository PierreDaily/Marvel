import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getHerosUseCase } from "./useCase";
import { useState } from "react";

export function usePagination({ limit }: { limit: number }) {
  const [offset, setOffset] = useState(0);
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
      hasNext: activePage === totalPageCount,
      hasPrev: activePage === 1,
      next: () => {
        setOffset(offset + limit);
      },
      prev: () => {
        setOffset(offset - limit);
      },
      totalPageCount,
      isSuccess: query.isSuccess,
      isLoading: query.isLoading,
    };
  }
  return { isLoading: false, isSuccess: false, data: [] };
}
