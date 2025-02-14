import { getHeroes } from "./model";
import { HeroesSchema } from "./validation";

export async function getHerosUseCase({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const data = await getHeroes({ offset, limit });
  const heroes = HeroesSchema.parse(data);
  return heroes;
}
