import { z } from 'zod'

/* 
  This file will contain all the transaction DTOs.
  Using zod schemas for both validation and type safety.
  the schemas can be converted to types using the z.infer function.
  Example: z.infer<typeof CreateUserDto>
*/
const CreateDepositDto = z.object({
  amount: z.number().positive(),
  description: z.string().optional(),
})

const ListTransactionsDto = z
  .object({
    page: z.string().optional(),
  })
  .refine((data) => {
    if (data.page && isNaN(Number(data.page))) {
      return {
        message: 'page must be a number',
        path: ['page'],
      }
    }
    return true
  })

const CreateWithdrawalDto = z.object({
  amount: z.number().positive(),
  description: z.string().optional(),
})

/* const CreateLoanDto = z.object({
  amount: z.number().positive(),
})

const PayLoanDto = z.object({
  amount: z.number().positive(),
})
 */
const RemoveTransactionDto = z.object({
  id: z.string(),
})

export {
  CreateDepositDto,
  CreateWithdrawalDto,
  RemoveTransactionDto,
  ListTransactionsDto,
}
