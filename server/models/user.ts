import { Schema, model } from 'mongoose'

export interface UserProps {
    email: string
    lastName: string
    password: string
    location: string
    firstName: string
    occupation: string
    picturePath: string
    impressions: string
    viewedProfile: string
    friends: Array<string | undefined>
}

const UserSchema = new Schema<UserProps>(
    {
        firstName: {
            min: 2,
            max: 50,
            type: String,
            required: true
        },
        lastName: {
            min: 2,
            max: 50,
            type: String,
            required: true
        },
        email: {
            max: 50,
            type: String,
            unique: true,
            required: true
        },
        password: {
            min: 5,
            type: String,
            required: true
        },
        picturePath: {
            default: '',
            type: String
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number
    },
    { timestamps: true }
)

export default model('User', UserSchema)