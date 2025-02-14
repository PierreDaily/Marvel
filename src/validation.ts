import z from "zod";

export const HeroesSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string().nonempty(),
    })
  ),
  limit: z.number().int().positive(),
  offset: z.number().int(),
  count: z.number().int(),
  total: z.number().int(),
});
