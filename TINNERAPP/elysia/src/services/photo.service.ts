import { photo } from "../types/photo.type"
import { ImageHelper } from "../helpers/image.helper"
import { Cloudinary } from "../configs/cloudinary.config"
import mongoose from "mongoose"
import { Photo } from "../models/photo.model"
import { User } from "../models/user.model"

export const PhotoService = {
    upload: async function (file: File, user_id: string): Promise<photo> {
        const buffer = await file.arrayBuffer()
        const isFileValid = ImageHelper.isImage(buffer)
        if (!isFileValid)
            throw new Error("Image must be .jpeg or .png")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`
        const cloudPhoto = await Cloudinary.uploader.upload(dataURI, {
            folder: '-class-example-user-images',
            resource_type: 'auto',
            transformation: [{
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: 'face',
            }]
        })
        if (!cloudPhoto.public_id || !cloudPhoto.secure_url)
            throw new Error("Something went wrong , try again later !!")

        const uploadPhoto = new Photo({
            user: new mongoose.Types.ObjectId(user_id),
            url: cloudPhoto.secure_url,
            public_id: cloudPhoto.public_id
        })
        await uploadPhoto.save()
        await User.findByIdAndUpdate(
            user_id,
            { $push: { photos: uploadPhoto._id } }
        )
        return uploadPhoto.toPhoto()
    },

    get: async function (user_id: string): Promise<photo[]> {
        throw new Error("not implement")
    },

    delete: async function (photo_id: string, user_id: string): Promise<boolean> {
        throw new Error("not implement")
    },

    setAvatar: async function (photo_id: string, user_id: string): Promise<boolean> {
        throw new Error("not implement")
    },
}