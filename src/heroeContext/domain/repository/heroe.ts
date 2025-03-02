import { Hero } from "../entity/heroe";

export interface HeroRepository {
  findAll({ limit, offset }: { limit: number; offset: number }): Promise<{
    data: Hero[];
    limit: number;
    offset: number;
    count: number;
    total: number;
  }>;
}
