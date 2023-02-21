/* eslint-disable @typescript-eslint/no-empty-function */

import { Account, User } from '@prisma/client'

import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { TransactionService } from '../../src/services/transactionService'

/* 
  This file contains unit tests for the user service.
  More specifically, it will test the transaction-related functions.
  This does not test the routes, only the business logic.
  This also means that authentication and authorization are not tested here.
*/

const testUser = {
  name: 'Teste',
  email: 'transactiontest@gmail.com',
  password: '12345678',
}

const transactionService = new TransactionService()
const startingBalance = 1000
let user: User
let account: Account

beforeAll(async () => {
  await prisma.user.deleteMany().catch((err) => {})
  user = await prisma.user.create({
    data: {
      ...testUser,
      password: await hashPassword(testUser.password),
    },
  })
  account = await prisma.account.create({
    data: {
      balance: startingBalance,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
})

describe('User transaction tests', () => {
  test('Should make a deposit of 100', async () => {
    const updatedAccount = await transactionService.deposit(user.id, {
      amount: 100,
    })

    expect(updatedAccount.balance).toBe(startingBalance + 100)
  })

  test('Should make a withdrawal of 100 with description', async () => {
    const updatedAccount = await transactionService.withdraw(user.id, {
      amount: 100,
    })

    expect(updatedAccount.balance).toBe(startingBalance)
  }, 1000)

  test('Should not make a withdal of 2000', async () => {
    await expect(
      transactionService.withdraw(user.id, {
        amount: 2000,
      })
    ).rejects.toThrow()
  })

  test('Should not make a deposit of 0', async () => {
    await expect(
      transactionService.deposit(user.id, {
        amount: 0,
      })
    ).rejects.toThrow()
  })

  test('Should list all transactions', async () => {
    const transactions = await transactionService.listTransactions(user.id)
    expect(transactions).toHaveLength(2)
  })
})
