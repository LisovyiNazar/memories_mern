import Users from '../models/users.model.js'
import jwt from 'jsonwebtoken'

export const googleLogin = async (req, res) => {
    try {
        const { credentials, nickName, isNickName } = req.body
        const { given_name, family_name, email } = credentials
        const userData = { email: email, firstName: given_name, lastName: family_name, nickName: nickName }
        const userExist = await Users.findOne({ email: email })
        
        if (!userExist && !isNickName) {
            res.status(200).json({ continue: true })
        } else if (!userExist && isNickName) {
            const userNickName = await Users.findOne({ nickName: nickName })

            if (!userNickName) {
                await userCreate(userData).then((data) => {
                    userData.id = data._id
                })
                
                const token = jwt.sign(
                    userData,
                    process.env.TOKEN_KEY, 
                    {
                        expiresIn: process.env.TOKEN_EXP
                    }
                )
        
                res.status(200).json({ user: userData, token: token})
            } else {
                res.status(200).json({ errors: { nickName: `User with this nickName already exist` } })
            }

        } else if (userExist) {
            const { _id, email, given_name, family_name, nickName } = userExist
            const userData = { id: _id, email: email, firstName: given_name, lastName: family_name, nickName: nickName }
            
            const token = jwt.sign(
                userData,
                process.env.TOKEN_KEY, 
                {
                    expiresIn: process.env.TOKEN_EXP
                }
            )
    
            res.status(200).json({ user: userData, token: token})
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email: email })
        
        if (user) {
            const { _id, email, firstName, lastName, nickName } = user

            if (!user.password) {
                res.status(200).json({ errors: { email: `This email was used by gmail registration` }})
            }

            if (user.password === password) {
                const userData = {
                    id: _id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    nickName: nickName
                }
    
                const token = jwt.sign(
                    userData,
                    process.env.TOKEN_KEY, 
                    {
                        expiresIn: process.env.TOKEN_EXP
                    }
                )

                res.status(200).json({ user: user, token: token})
            } else {
                res.status(200).json({ errors: { password: `Incorect password` } })
            }
        } else {
            res.status(200).json({ errors: { email: `No user found with this email address` } })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const register = async (req, res) => {
    try {
        const { email } = req.body
        
        const checkUser = await Users.findOne({ email: email })

        if (!checkUser) {

            const userNickName = await Users.findOne({ nickName: req.body.nickName })
            if (userNickName) {
                res.status(200).json({ errors: {  nickName: `User with this nickname already exist` } })
            } else {
                const createdUser = await userCreate(req.body)
        
                const token = jwt.sign(
                    { ...req.body },
                    process.env.TOKEN_KEY, 
                    {
                        expiresIn: process.env.TOKEN_EXP
                    }
                )
        
                res.status(200).json({ user: createdUser, token: token })
            }

        } else {
            res.status(200).json({ errors: { email: `User with this email already exist` } })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const userCreate = async (data) => {
    return await Users.create(data)
}