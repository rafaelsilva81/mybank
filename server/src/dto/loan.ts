import { z } from 'zod'

/* 
  This file will contain all the loan DTOs.
  Using zod schemas for both validation and type safety.
  the schemas can be converted to types using the z.infer function.
  Example: z.infer<typeof CreateUserDto>
*/

const CreateLoanDto = z.object({
  amount: z.number().positive(),
})

const PayLoanDto = z.object({
  amount: z.number().positive(),
})

export { CreateLoanDto, PayLoanDto }
