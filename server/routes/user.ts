import { Router } from 'express'

import { upload } from '@utils/multer'
import { verifyToken } from '@middlewares/auth'
import {
    accountFriends,
    accountInformation,
    accountRegistration,
    accountFriendAddOrRemove
} from '@controllers/user'

const userRouter = Router()

userRouter.post(
    '/register',
    upload.single('picturePath'),
    accountRegistration
)
userRouter.get(
    '/:id',
    verifyToken,
    accountInformation
)
userRouter.get(
    '/:id/friends',
    verifyToken,
    accountFriends
)
userRouter.patch(
    '/:id/:friendId',
    verifyToken,
    accountFriendAddOrRemove
)

export default userRouter