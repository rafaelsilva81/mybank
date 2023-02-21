import { prisma } from '../config/prisma'
import AccountNotFoundError from '../errors/account/accountNotFoundError'
import InsufficientFundsError from '../errors/balance/insufficientFundsError'
import BadRequestError from '../errors/other/badRequestError'
import InternalError from '../errors/other/internalError'

/* 
  This file will contain all the loan business logic related to loans.
  It will be used by the loanRouter to handle the routes.
*/
export class LoanService {
  async getLoan(userId: string, amount: number) {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const loan = await prisma.loan.findUnique({
      where: {
        accountId: account.id,
      },
    })

    if (loan) {
      throw new BadRequestError('You already have an active loan')
    }

    const interest = 0.0001 * amount

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: account.balance + amount,
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    const newLoan = await prisma.loan.create({
      data: {
        account: {
          connect: {
            id: account.id,
          },
        },
        amount,
        interest,
      },
    })

    return newLoan
  }

  async payLoan(userId: string, amount: number) {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const loan = await prisma.loan.findUnique({
      where: {
        accountId: account.id,
      },
    })

    if (!loan) {
      throw new BadRequestError('You do not have an active loan')
    }

    if (loan.amount - amount <= 0) {
      throw new InsufficientFundsError(
        'You do not have enough funds to pay this loan'
      )
    }

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: account.balance - amount,
      },
    })

    if (!updatedAccount) {
      throw new InternalError('Error updating account')
    }

    const clearedLoan = await prisma.loan.delete({
      where: {
        id: loan.id,
      },
    })

    return clearedLoan
  }

  async getLoanInfo(userId: string) {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    const loan = await prisma.loan.findUnique({
      where: {
        accountId: account.id,
      },
    })

    return loan
  }
}