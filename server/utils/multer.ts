import * as crypto from 'crypto'
import * as multer from 'multer'

import type { Request } from 'express'

export const upload = multer({
    storage: multer.diskStorage({
        destination (
            _: Request,
            __: object,
            next: (param: any, storage: string) => void
        ) {
            next(null, 'images')
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

            next(null, `${ crypto.randomUUID() }.${ fileExt }`)
        }
    })
})