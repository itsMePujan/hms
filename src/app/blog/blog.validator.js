const { z } = require("zod");

const BlogCreateSchema = z.object({
  title: z.string().min(2).require(),
  image: z.string().require(),
  description: z.string().nullable(),
  status: z
    .string()
    .regex(/active|inactive/)
    .default("active"),
});

module.exports = { BlogCreateSchema };
