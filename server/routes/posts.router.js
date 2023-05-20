import express from 'express'
import { getPosts, getUserPosts, getLikedPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.controller.js'

const postsRouter = express.Router()

postsRouter.get('/:page', getPosts)
postsRouter.get('/user/:nickname', getUserPosts)
postsRouter.get('/liked/user/:nickname', getLikedPosts)
postsRouter.post('/', createPost)
postsRouter.patch('/:id', updatePost)
postsRouter.delete('/:id', deletePost)
postsRouter.patch('/like/:id', likePost)

export default postsRouter