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
  // token: z.string().max(100),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          " Minimum eight characters, at least one letter, one number and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match",
    path: ["confirmPassword"],
  });

module.exports = { registerSchema, passwordSchema };
