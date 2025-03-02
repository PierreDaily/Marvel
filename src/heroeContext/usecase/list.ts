import { Hero } from "../domain/entity/heroe";
import { HeroRepository } from "../domain/repository/heroe";

function heroesFactory(input: {
  data: Hero[];
  limit: number;
  offset: number;
  count: number;
  total: number;
}) {
  input.data.forEach((hero) => {
    hero.thumbnail.path = hero.thumbnail.path.replace("http", "https");
  });
  return input;
}

export function buildGetHerosUseCase(heroRepository: HeroRepository) {
  return async function ({ limit, offset }: { limit: number; offset: number }) {
    const heroes = await heroRepository.findAll({ limit, offset });
    return heroesFactory(heroes);
  };
}
