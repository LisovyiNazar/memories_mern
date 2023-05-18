import Users from '../models/users.model.js'
import jwt from 'jsonwebtoken'

export const googleLogin = async (req, res) => {
    try {
        const { given_name, family_name, email } = req.body.credentials
        const userData = { email: email, firstName: given_name, lastName: family_name, nickName: email }
        const userExist = await Users.findOne({ email: email })
        
        if (!userExist) {
            await userCreate(userData).then((data) => {
                userData.id = data._id
            })
        }

        const token = jwt.sign(
            userData,
            process.env.TOKEN_KEY, 
            {
                expiresIn: process.env.TOKEN_EXP
            }
        )

        res.status(200).json({ user: userData, token: token})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email: email })
        
        if (user) {
            const { _id, email, firstName, lastName } = user

            if (!user.password) {
                res.status(200).json({ errors: { email: `This email was used by gmail registration` }})
            }

            if (user.password === password) {
                const userData = {
                    id: _id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
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
            const createdUser = await userCreate(req.body)
    
            const token = jwt.sign(
                { ...req.body },
                process.env.TOKEN_KEY, 
                {
                    expiresIn: process.env.TOKEN_EXP
                }
            )
    
            res.status(200).json({ user: createdUser, token: token })
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