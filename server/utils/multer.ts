import * as multer from 'multer'

import type { Request } from 'express'

export const upload = multer({
    storage: multer.diskStorage({
        destination (
            _: Request,
            __: object,
            next: (param: any, storage: string) => void
        ) {
            next(null, 'public/assets')
        },
        filename (
            _: Request,
            file: {
                originalname: string
            },
            next: (param: any, storage: string) => void
        ) {
            next(null, file.originalname)
        }
    })
})