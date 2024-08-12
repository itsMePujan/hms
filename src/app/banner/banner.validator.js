const { z } = require("zod");

const BannerCreateSchema = z.object({
  title: z.string().min(3),
  url: z.string().url().default(null),
  status: z
    .string()
    .regex(/active|inactive/)
    .default("inactive"),
});

module.exports = { BannerCreateSchema };
