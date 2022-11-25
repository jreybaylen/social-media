import { Router } from 'express'

import { upload } from '@utils/multer'
import { accountRegistration } from '@controllers/user'

const userRouter = Router()

userRouter.post(
    '/register',
    upload.single('picture'),
    accountRegistration
)

export default userRouter