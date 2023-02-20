import { z } from 'zod'

const CreateUserDto = z.object({
  name: z.string().max(100),
  email: z.string().email(),
  password: z.string().min(6),
})

const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
})

const UpdateUserDto = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email().optional(),
})

const UpdateUserPasswordDto = z.object({
  password: z.string().min(6),
  newPassword: z.string().min(6),
})

export { CreateUserDto, LoginUserDto, UpdateUserDto, UpdateUserPasswordDto }
