import z from "zod";

export const HeroesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().nonempty(),
  })
);
