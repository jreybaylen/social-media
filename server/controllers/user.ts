import * as bcrypt from 'bcrypt'

import UserModel from '@models/user'

import type { MongooseError } from 'mongoose'
import type { UserProps } from '@models/user'
import type { Request, Response } from 'express'

type UserID = {
    id: string
}

type FriendID = {
    friendId: string
}

export async function accountRegistration (
    req: Request<{}, {}, UserProps>,
    res: Response
) {
    try {
        const salt = await bcrypt.genSalt()
        const { password, ...rest } = req.body
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = await (
            new UserModel({
                ...rest,
                password: passwordHash,
                picturePath: req.file?.filename,
                impressions: Math.floor(Math.random() * 10000),
                viewedProfile: Math.floor(Math.random() * 10000)
            })
        ).save()

        res.status(201).json(newUser)
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function accountInformation (
    req: Request<{}, {}, UserID>,
    res: Response
) {
    try {
        const user = await UserModel.findById(req.body.id)

        res.status(200).json(user)
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function accountFriends (
    req: Request<{}, {}, UserID>,
    res: Response
) {
    try {
        const user = await UserModel.findById(req.body.id)
        
        if (user) {
            const friends = await Promise.all(
                user?.friends.map(
                    (friendId: string | undefined) => UserModel.findById(friendId)
                )
            )
            
            return res.status(200).json(friends)
        }

        res.status(400).json({
            error: 'Invalid User ID!'
        })
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}

export async function accountFriendAddOrRemove (
    req: Request<{}, {}, UserID & FriendID>,
    res: Response
) {
    try {
        const { id, friendId } = req.body
        const user = await UserModel.findById(id)
        const friend = await UserModel.findById(friendId)
        const isFriend = user?.friends.includes(friendId)
        const updatedUserFriends = isFriend
            ? user?.friends.filter(
                (userId: string | undefined) => userId !== friendId
            ) : [
                ...(user?.friends || []),
                friendId
            ]
        const updatedFriendFriends = isFriend
            ? friend?.friends.filter(
                (userId: string | undefined) => userId !== id
            ) : [
                ...(friend?.friends || []),
                id
            ]
        const updateUserFriends = {
            ...user,
            friends: updatedUserFriends
        }

        await (new UserModel(updateUserFriends)).save()
        await (new UserModel({ ...friend, friends: updatedFriendFriends })).save()

        const friends = await Promise.all(
            (updateUserFriends.friends as Array<string>).map(
                (friendId: string | undefined) => UserModel.findById(friendId)
            )
        )

        res.status(200).json(friends)
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}