import PostModel from '@models/post'
import UserModel from '@models/user'

import type { MongooseError } from 'mongoose'
import type { Request, Response } from 'express'

type FeedPostProps = {
    userId: string
    description: string
    picturePath: string
}

export async function newsFeedPosts (
    req: Request,
    res: Response
) {
    try {
        const posts = await PostModel.find()

        res.status(200).json(posts)
    } catch (ERROR: any) {
        res.status(404).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function visitedNewsFeedPosts (
    req: Request<{ userId: string }>,
    res: Response
) {
    try {
        const post = await PostModel.find({
            userId: req.params.userId
        })

        res.status(200).json(post)
    } catch (ERROR: any) {
        res.status(404).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function feedPostLike (
    req: Request<{ id: string }, {}, { userId: string }>,
    res: Response
) {
    try {
        const post = await PostModel.findById(req.params.id)

        if (post) {
            const { userId } = req.body

            post.likes.get(userId)
                ? post.likes.delete(userId)
                : post.likes.set(userId, true)

            const updatedPost = await PostModel.findByIdAndUpdate(
                { id: req.params.id },
                { likes: post.likes },
                { new: true }
            )

            res.status(200).json(updatedPost)
        }

        res.status(500).json({
            error: 'Post Not Found!'
        })
    } catch (ERROR: any) {
        res.status(404).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function createFeedPost (
    req: Request<{}, {}, FeedPostProps>,
    res: Response
) {
    try {
        const user = await UserModel.findById(req.body.userId)

        if (user) {
            await (
                new PostModel({
                    location: user.location,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    userPicturePath: user.picturePath,
                    ...req.body,
                    likes: {},
                    comments: []
                })
            ).save()

            const posts = await PostModel.find()

            res.status(201).json(posts)
        }

        res.status(500).json({
            error: 'User Not Found!'
        })
    } catch (ERROR: any) {
        res.status(409).json({
            error: (ERROR as MongooseError).message
        })
    }
}