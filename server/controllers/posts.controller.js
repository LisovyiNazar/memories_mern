import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.model.js"
import Users from '../models/users.model.js'

export const getPosts = async (req, res) => {
    const { page } = req.params
    const POST_PER_PAGE = 4

    try {
        const allPosts = await PostMessage.find()

        const posts = await PostMessage.find()
            .limit(POST_PER_PAGE)
            .skip(POST_PER_PAGE * page - POST_PER_PAGE)

        res.status(200).json({
            items: posts,
            pagination: {
                pageCount: Math.ceil(allPosts.length / POST_PER_PAGE)
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    const { nickname } = req.params

    try {
        const userPosts = await PostMessage.find()

        res.status(200).json(userPosts.filter((post) => post.creator.nickName === nickname))
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getLikedPosts = async (req, res) => {
    const { nickname } = req.params

    try {
        const user = await Users.find({ nickName: nickname })
        
        const likedPosts = await PostMessage.find({'_id': { $in: user[0].likedPosts}})
        
        res.status(200).json(likedPosts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const post = req.body
    const { id: _id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id')
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { _id, ...post }, {new: true })
        
        res.status(202).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id')
        }

        await PostMessage.findByIdAndDelete(_id)
        
        res.status(202).json({ id: _id, message: 'Post deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    const { userId } = req.body
    const { id: _id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id')
        }

        const post = await PostMessage.findById(_id)
        const user = await Users.findById(userId)

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true } )
        await Users.findByIdAndUpdate(userId, { ...user, likedPosts: user.likedPosts.push((post)) }, { new: true } )
        
        res.status(202).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}