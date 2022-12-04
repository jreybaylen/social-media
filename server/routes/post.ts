import { Router } from 'express'

import { upload } from '@utils/multer'
import { verifyToken } from '@middlewares/auth'

import {
    newsFeedPosts,
    visitedNewsFeedPosts,
    feedPostLike,
    createFeedPost
} from '@controllers/posts'

const postsRouter = Router()

postsRouter.get(
    '/',
    verifyToken,
    newsFeedPosts
)
postsRouter.get(
    '/:userId/posts',
    verifyToken,
    visitedNewsFeedPosts
)
postsRouter.patch(
    '/:id/like',
    verifyToken,
    feedPostLike
)
postsRouter.post(
    '/create',
    verifyToken,
    upload.single('picture'),
    createFeedPost
)

export default postsRouter