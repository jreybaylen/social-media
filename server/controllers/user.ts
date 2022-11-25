import bcrypt from 'bcrypt'

import UserModel from '@models/user'

import type { MongooseError } from 'mongoose'
import type { UserProps } from '@models/user'
import type { Request, Response } from 'express'

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