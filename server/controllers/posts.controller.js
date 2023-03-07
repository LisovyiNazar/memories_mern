import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.model.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
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
    const { id: _id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id')
        }

        const post = await PostMessage.findById(_id)

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true } )
        
        res.status(202).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}