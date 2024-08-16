const { z } = require("zod");

const categoryCreateSchema = z.object({
  title: z.string().min(2),
  description: z.string().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
});

module.exports = { categoryCreateSchema };
