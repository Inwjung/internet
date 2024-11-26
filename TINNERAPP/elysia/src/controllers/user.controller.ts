import Elysia from "elysia"
import { AuthiMiddleWare } from "../middlewares/auth.middleware"

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(AuthiMiddleWare)

    .get('/all', () => {
        return {
            text: "Hello word"
        }
    }, {
        isSignIn: true
    })