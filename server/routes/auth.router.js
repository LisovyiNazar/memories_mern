import express from 'express'
import { googleLogin, login, register } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/google-login', googleLogin)
authRouter.post('/login', login)
authRouter.post('/register', register)

export default authRouter