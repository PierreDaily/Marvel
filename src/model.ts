import CryptoJS from "crypto-js";

export async function getHeroes({
  limit = 20,
  offset = 0,
}: {
  limit: number;
  offset: number;
}): Promise<{
  data: { id: number; name: string }[];
  offset: number;
  limit: number;
  total: number;
  count: number;
}> {
  const params = new URLSearchParams();
  const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  params.append("limit", String(limit));
  params.append("offset", String(offset));
  params.append("apikey", publicKey);
  params.append("ts", "2025-02-12T17:01:33.714Z");
  params.append(
    "hash",
    CryptoJS.MD5(`2025-02-12T17:01:33.714Z${privateKey}${publicKey}`).toString()
  );
  const queryString = params.toString();
  return fetch(`http://gateway.marvel.com/v1/public/characters?${queryString}`)
    .then((res) => res.json())
    .then((data) => {
      const { results, limit, offset, count, total } = data.data;
      return { data: results, limit, offset, count, total };
    });
}
