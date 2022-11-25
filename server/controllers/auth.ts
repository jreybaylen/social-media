import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '@models/user'

import type { MongooseError } from 'mongoose'
import { SignInProps } from '@interfaces/auth'
import type { Request, Response } from 'express'

export async function accountValidator (
    req: Request<{}, {}, SignInProps>,
    res: Response
) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })

        if (user) {
            const matchUser = await bcrypt.compare(password, user?.password)

            if (matchUser) {
                const { password, ...restUser } = user
                const token = jwt.sign(
                    { id: restUser._id },
                    process.env.SECRET_KEY as string
                )
                
                res.status(200).json({
                    token,
                    user: restUser
                })
            }

            res.status(400).json({
                error: 'Invalid Credentials'
            })
        }

        res.status(400).json({
            error: 'User Not Found!'
        })
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}