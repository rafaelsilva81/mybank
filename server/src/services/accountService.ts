import { prisma } from '../config/prisma'
import AccountNotFoundError from '../errors/account/accountNotFoundError'

/* 
    This file will contain all the account business logic related to accounts.
    It will be used by the accountRouter to handle the routes.
*/
export class AccountService {
  async getAccount(userId: string) {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    return account
  }

  async getBalance(userId: string) {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    })

    if (!account) {
      throw new AccountNotFoundError('Account not found')
    }

    return account.balance
  }
}
