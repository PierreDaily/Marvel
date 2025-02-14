import { getHeroes } from "./model";

export async function getHerosUseCase({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const data = await getHeroes({ offset, limit });
  return data;
}
