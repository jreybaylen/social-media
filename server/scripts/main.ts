import helmet from 'helmet'
import * as cors from 'cors'
import * as path from 'path'
import mongoose from 'mongoose'
import * as morgan from 'morgan'
import * as dotenv from 'dotenv'
import * as multer from 'multer'
import * as express from 'express'
import * as bodyParser from 'body-parser'

const app = express()
const storage = multer.diskStorage({
    destination (
        _: express.Request,
        __: object,
        next: (param: any, storage: string) => void
    ) {
        next(null, 'public/assets')
    },
    filename (
        _: express.Request,
        file: {
            originalname: string
        },
        next: (param: any, storage: string) => void
    ) {
        next(null, file.originalname)
    }
})
const upload = multer({ storage })

dotenv.config()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('common'))
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
)
app.use(
    bodyParser.json({
        limit: '30mb'
    })
)
app.use(
    bodyParser.urlencoded({
        limit: '30mb',
        extended: true
    })
)
app.use(
    '/assets',
    express.static(
        path.join(__dirname, 'public/assets')
    )
)

mongoose
    .connect(
        process.env.MONGO_DB as string
    )
    .then(
        () => {
            const PORT = process.env.PORT || 2019

            console.log('App is now connected to MongoDB')
            app.listen(PORT, () => {
                console.log(`App is now running using http://localhost:${ PORT }`)
            })
        }
    )
    .catch(
        (ERROR) => {
            console.error('ERROR: ', ERROR)
        }
    )