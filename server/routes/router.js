import express from 'express'
import postsRouter from './posts.router.js'

const router = express.Router()

router.use('/posts', postsRouter)

export default router