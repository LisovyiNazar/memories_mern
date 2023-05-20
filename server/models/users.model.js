import mongoose from 'mongoose'

const userShema = mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    email: String,
    password: String,
    likedPosts: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Users = mongoose.model('Users', userShema)

export default Users