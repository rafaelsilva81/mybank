import { Router as expressRouter } from 'express'

import { TransactionService } from '../services/transactionService'

const transactionRouter = expressRouter()
const transactionService = new TransactionService()

transactionRouter.get('')
