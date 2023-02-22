import { Router as expressRouter } from 'express'
import { Request as JWTRequest } from 'express-jwt'

import {
  CreateDepositDto,
  CreateWithdrawalDto,
  RemoveTransactionDto,
} from '../dto/transaction'
import { TransactionService } from '../services/transactionService'

const transactionRouter = expressRouter()
const transactionService = new TransactionService()

transactionRouter.get('/', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const transactions = await transactionService.listTransactions(id)

    res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
})

transactionRouter.get('/:id', async (req: JWTRequest, res, next) => {
  try {
    const userId = req.auth?.id
    const transactionId = RemoveTransactionDto.parse(req.params).id

    const transaction = await transactionService.getTransaction(
      userId,
      transactionId
    )

    res.status(200).json(transaction)
  } catch (error) {
    next(error)
  }
})

transactionRouter.post('/deposit', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id
    const transactionData = CreateDepositDto.parse(req.body)

    const transaction = await transactionService.deposit(id, transactionData)

    res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
})

transactionRouter.post('/withdraw', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id
    const transactionData = CreateWithdrawalDto.parse(req.body)

    const transaction = await transactionService.withdraw(id, transactionData)

    res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
})

export default transactionRouter
