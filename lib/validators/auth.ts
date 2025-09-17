import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Ism juda qisqa"),
  email: z.string().email("Email noto‘g‘ri"),
  password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo‘lsin"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
