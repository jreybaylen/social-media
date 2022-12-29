import { Router } from 'express'

import { accountValidator } from '@controllers/auth'

const authRouter = Router()

authRouter.post(
    '/sign-in',
    accountValidator
)

export default authRouter