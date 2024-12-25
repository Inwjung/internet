import mongoose, { Mongoose } from "mongoose"
import { Password } from "bun"
import { register, user } from "../types/account.type"

type userWithOutid = Omit<user, 'id'>

export interface IUserDocument extends mongoose.Document, userWithOutid {
    password_hash: string

    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerDate: register) => Promise<IUserDocument>
}