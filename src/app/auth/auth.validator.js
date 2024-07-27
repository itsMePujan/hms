const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2).max(40),
  email: z.string().email(),
  role: z
    .string()
    .regex(/admin|user/)
    .default("user"),
  status: z
    .string()
    .regex(/admin|inactive/)
    .default("inactive"),
});

module.exports = { registerSchema };
