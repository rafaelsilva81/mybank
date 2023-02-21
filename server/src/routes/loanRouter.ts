import { Router as expressRouter } from 'express'
import { Request as JWTRequest } from 'express-jwt'

import { CreateLoanDto } from '../dto/loan'
import { LoanService } from '../services/loanService'

const loanRouter = expressRouter()
const loanService = new LoanService()

loanRouter.get('/', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const loan = await loanService.getLoanInfo(id)

    res.status(200).json(loan)
  } catch (error) {
    next(error)
  }
})

loanRouter.post('/apply', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id
    const loanData = CreateLoanDto.parse(req.body)

    const loan = await loanService.applyForLoan(id, loanData.amount)

    res.status(201).json(loan)
  } catch (error) {
    next(error)
  }
})

loanRouter.post('/pay', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const loan = await loanService.payLoan(id)

    res.status(204).json({})
  } catch (error) {
    next(error)
  }
})

export default loanRouter
