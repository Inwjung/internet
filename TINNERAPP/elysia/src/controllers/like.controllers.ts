import Elysia from "elysia"
import { AuthiMiddleWare, AuthPayload } from "../middlewares/auth.middleware"
import { LikeService } from "../services/like.services"
import { UserDto } from "../types/user.type"

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ['Like']
})
    .use(AuthiMiddleWare)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await LikeService.toggleLike(user_id, target_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {
        detail: { summary: "ToggleLike" },
        isSignIn: true,
        body: "target_id"
    })