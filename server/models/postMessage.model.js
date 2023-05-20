import mongoose from 'mongoose'

const { Schema } = mongoose

const postShema = Schema({
    title: String,
    message: String,
    creator: Object,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postShema)

export default PostMessage