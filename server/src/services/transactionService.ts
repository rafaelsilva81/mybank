import { prisma } from '../config/prisma'
import AccountNotFoundError from '../errors/account/accountNotFoundError'
import InsufficientFundsError from '../errors/balance/insufficientFundsError'
import InternalError from '../errors/other/internalError'

/* 
  This file will contain all the transaction business logic related to transactions.
  It will be used by the transactionRouter to handle the routes.
*/
export class TransactionService {
  // this will create a new deposit and update the balance
  async deposit(userId: string, amount: number) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: amount,
        accountId: account.id,
        type: 'DEPOSIT',
      },
    })

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: account.balance + amount,
        transactions: {
          connect: {
            id: newTransaction.id,
          },
        },
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    return updatedAccount
  }

  // this will create a new withdrawal and update the balance
  async withdraw(userId: string, amount: number) {
    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    if (account.balance - amount <= 0) {
      throw new InsufficientFundsError('Insufficient funds for withdrawal')
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: amount,
        accountId: account.id,
        type: 'WITHDRAWAL',
      },
    })

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },

      data: {
        balance: account.balance - amount,
        transactions: {
          connect: {
            id: newTransaction.id,
          },
        },
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    return updatedAccount
  }

  // this will remove the transaction from histroy withouth affecting the balance
  async removeTransaction(userId: string, transactionId: string) {
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
      throw new InternalError('Transaction not found')
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })
  }

  // list transactions for a given user
  async listTransactions(userId: string) {
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
    })

    return transactions
  }
}
