import { Router } from 'express'

import { accountValidator } from '@controllers/auth'

const authRouter = Router()

authRouter.post(
    '/login',
    accountValidator
)

export default authRouter