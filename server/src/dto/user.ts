import { z } from 'zod'

/* 
  This file will contain all the user DTOs.
  Using zod schemas for both validation and type safety.
  the schemas can be converted to types using the z.infer function.
  Example: z.infer<typeof CreateUserDto>
*/
const CreateUserDto = z
  .object({
    name: z.string().max(100),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
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
