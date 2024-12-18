import { User } from "../models/user.model"
import { login, register, user } from "../types/account.type"

export const AccountService = {
    login: async function (loginDeta: login): Promise<user> {
        const user = await User.findOne({ username: loginDeta.username })
            .populate("photos")

            .populate({
                pats: "following",
                sel
            })
            .exec()
        if (!user)
            throw new Error("User does not exist")
        const verifyPassword = await user.verifyPassword(loginDeta.password)
        if (!verifyPassword)
            throw new Error("password is incorrect")
        return user.toUser()
    },
    createNewUser: async function (registerDate: register): Promise<user> {
        const user = await User.findOne({ username: registerDate.username }).exec()
        if (user)
            throw new Error(`${registerDate.username}already exists`)
        const newUser = await User.createUser(registerDate)
        return newUser.toUser()
    }
}
