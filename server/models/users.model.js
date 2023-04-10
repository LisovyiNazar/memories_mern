import mongoose from 'mongoose'

const userShema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Users = mongoose.model('Users', userShema)

export default Users