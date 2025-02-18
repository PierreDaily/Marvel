import { getHeroes } from "./model";

type HeroesRawData = {
  data: {
    count: number;
    limit: number;
    offset: number;
    results: {
      id: number;
      name: string;
      thumbnail: {
        extension: string;
        path: string;
      };
    }[];
    total: number;
  };
};

type HeroesDtoOutput = {
  data: {
    id: number;
    name: string;
    thumbnail: {
      extension: string;
      path: string;
    };
  }[];
  limit: number;
  offset: number;
  count: number;
  total: number;
};

const heroesDto = (input: HeroesRawData): HeroesDtoOutput => {
  const { results, limit, offset, count, total } = input.data;
  return { data: results, limit, offset, count, total };
};

function heroesFactory(input: HeroesDtoOutput) {
  input.data.forEach((hero) => {
    hero.thumbnail.path = hero.thumbnail.path.replace("http", "https");
  });
  return input;
}

export async function getHerosUseCase({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const data = await getHeroes({ offset, limit });
  const heroes = heroesFactory(heroesDto(data));
  return heroes;
}
