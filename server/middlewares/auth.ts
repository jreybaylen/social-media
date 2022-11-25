import jwt from 'jsonwebtoken'

import type { MongooseError } from 'mongoose'
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

export function verifyToken (
    req: Request & { user: JwtPayload | string },
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization as string

        if (!token) {
            res.status(403).send('Access Denied!')
        }

        const computedToken = token.startsWith('Bearer ') ? token.split('Bearer ')[1] : token
        const verifiedToken = jwt.verify(
            computedToken,
            process.env.SECRET_KEY as string
        )

        req.user = verifiedToken
        next()
    } catch (ERROR: any) {
        res.status(500).json({
            error: (ERROR as MongooseError).message
        })
    }
}