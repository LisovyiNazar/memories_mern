import express from 'express'
import postsRouter from './posts.router.js'
import authRouter from './auth.router.js'

const router = express.Router()

router.use('/posts', postsRouter)
router.use('/auth', authRouter)

export default router