import { z } from "zod";

const CreateUserDto = z.object({
  name: z.string().max(100, {
    message: "Name must be at most 100 characters long",
  }),
  email: z.string().email({
    message: "Email must be a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { CreateUserDto, LoginUserDto };
