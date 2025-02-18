import CryptoJS from "crypto-js";
import { HeroesSchema } from "./validation";

function addAuthParams(
  url: string,
  { limit, offset }: { limit?: number; offset?: number }
) {
  const params = new URLSearchParams();
  const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const ts = Date.now().toString();
  if (limit && offset) {
    params.append("limit", String(limit));
    params.append("offset", String(offset));
  }
  params.append("apikey", publicKey);
  params.append("ts", ts);
  params.append(
    "hash",
    CryptoJS.MD5(`${ts}${privateKey}${publicKey}`).toString()
  );
  const queryString = params.toString();
  return `${url}?${queryString}`;
}
export async function getHeroes({
  limit = 20,
  offset = 0,
}: {
  limit: number;
  offset: number;
}): Promise<{
  data: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  }[];
  offset: number;
  limit: number;
  total: number;
  count: number;
}> {
  return fetch(
    addAuthParams("https://gateway.marvel.com/v1/public/characters", {
      offset,
      limit,
    })
  )
    .then((res) => res.json())
    .then((data) => {
      const { results, limit, offset, count, total } = data.data;
      const temp = { data: results, limit, offset, count, total };
      const heroes = HeroesSchema.parse(temp);
      return heroes;
    });
}
