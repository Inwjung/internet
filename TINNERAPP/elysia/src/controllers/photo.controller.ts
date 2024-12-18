import Elysia, { error, t } from "elysia"
import { ImageHelper } from "../helpers/image.helper"
import { PhotoDto } from "../types/photo.type"
import { AuthiMiddleWare, AuthPayload } from "../middlewares/auth.middleware"
import { PhotoService } from "../services/photo.service"
import { set } from "mongoose"


export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})
    .use(PhotoDto)
    .use(AuthiMiddleWare)

    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        await PhotoService.setAvatar(photo_id, user_id)
        set.status = "No Content"
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
        }
    }, {
        detail: { summary: "Set Avatar" },
        isSignIn: true,
        params: "photo_id"
    })

    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "Bad Request"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong, try again later !! ")
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "photo_id"
    })

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            PhotoService.upload(file, user_id)
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong, try again later !! ")
        }
    }, {

        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })


