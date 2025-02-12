import { getHeroes } from "./model";
import { HeroesSchema } from "./validation";

export async function useCaseGetHeros() {
  const data = await getHeroes();
  const heroes = HeroesSchema.parse(data);
  return heroes;
}
