import z from "zod";

export const HeroesSchema = z.object({
  data: z.object({
    count: z.number().int(),
    results: z.array(
      z.object({
        id: z.number(),
        name: z.string().nonempty(),
        thumbnail: z.object({
          extension: z.string(),
          path: z.string(),
        }),
      })
    ),
    limit: z.number().int(),
    offset: z.number().int(),
    total: z.number().int(),
  }),
});
