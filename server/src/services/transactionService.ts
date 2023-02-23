import { z } from 'zod'

import { prisma } from '../config/prisma'
import { CreateDepositDto, CreateWithdrawalDto } from '../dto/transaction'
import AccountNotFoundError from '../errors/account/accountNotFoundError'
import TransactionError from '../errors/account/transactionError'
import InsufficientFundsError from '../errors/balance/insufficientFundsError'
import InternalError from '../errors/other/internalError'

/* 
  This file will contain all the transaction business logic related to transactions.
  It will be used by the transactionRouter to handle the routes.
*/
export class TransactionService {
  // this will create a new deposit and update the balance
  async deposit(
    userId: string,
    transactionData: z.infer<typeof CreateDepositDto>
  ) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    if (transactionData.amount <= 0) {
      throw new TransactionError('Invalid amount')
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: transactionData.amount,
        accountId: account.id,
        type: 'DEPOSIT',
        description: transactionData.description,
      },
    })

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: account.balance + transactionData.amount,
        transactions: {
          connect: {
            id: newTransaction.id,
          },
        },
      },
      include: {
        transactions: true,
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    return updatedAccount
  }

  // this will create a new withdrawal and update the balance
  async withdraw(
    userId: string,
    transactionData: z.infer<typeof CreateWithdrawalDto>
  ) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    if (account.balance - transactionData.amount < 0) {
      throw new InsufficientFundsError('Insufficient funds for withdrawal')
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: transactionData.amount,
        accountId: account.id,
        type: 'WITHDRAWAL',
        description: transactionData.description,
      },
    })

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: account.balance - transactionData.amount,
        transactions: {
          connect: {
            id: newTransaction.id,
          },
        },
      },
      include: {
        transactions: true,
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    return updatedAccount
  }

  // list transactions for a given user
  async listTransactions(userId: string, page: number) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        accountId: account.id,
      },
      orderBy: {
        createdAt: 'desc', // sort by newest first
      },
      take: 10, // limit to 10 transactions
      skip: (page - 1) * 10,
    })

    // return only type, date and amount
    const returnTransactions = transactions.map((transaction) => {
      return {
        type: transaction.type,
        createdAt: transaction.createdAt,
        amount: transaction.amount,
      }
    })

    return {
      transactions: returnTransactions,
    }
  }

  // list specific transaction for a given user
  async getTransaction(userId: string, transactionId: string) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    })

    if (!transaction || transaction.accountId !== account.id) {
      throw new TransactionError('Transaction not found')
    }

    return transaction
  }
}
