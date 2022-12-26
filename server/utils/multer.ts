import * as multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

import type { Request } from 'express'

export const upload = multer({
    storage: multer.diskStorage({
        destination (
            _: Request,
            __: object,
            next: (param: any, storage: string) => void
        ) {
            next(null, 'uploads')
        },
        filename (
            _: Request,
            file: {
                originalname: string
            },
            next: (param: any, storage: string) => void
        ) {
            const fileInformation = file.originalname.split('.')
            const fileExt = fileInformation[ fileInformation.length - 1 ]

            next(null, `${ uuidv4() }.${ fileExt }`)
        }
    })
})