import { Schema, model } from 'mongoose'

import type { ESMap } from 'typescript'

interface PostProps {
    userId: string
    lastName: string
    location: string
    firstName: string
    description: string
    picturePath: string
    userPicturePath: string
    likes: ESMap<string, boolean>
    comments: Array<string | undefined>
}

const PostSchema = new Schema<PostProps>(
    {
        userId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
)

export default model('Post', PostSchema)