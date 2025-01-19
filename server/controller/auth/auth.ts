import { Request, Response } from "express"
import Users from "../../schema/users/users"
import { createJWT } from "../../helper/jwt"
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()
        const user = await Users.findOne({ email, password })
        if (!user) {
            res.status(400).json({ mssge: 'Email or Password incorrect, try again.' })
            return
        }
        const { _id } = user
        const token: any = await createJWT(_id, email, password)

        res.cookie("token", token, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            path: '/'
        }).json({ user, token })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ mssge: 'Fatal crash, Please contact the supplier.' })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token', { sameSite: "none", secure: true, }).status(200).redirect('/auth/login')

    } catch (error) {
        res.status(500).json({ mssge: error })

    }
}

export const verifyToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies
        if (!token) {
            res.clearCookie('token', { sameSite: "none", secure: true, }).redirect('/auth/login')
            return
        }
        try {
            const { _id }: any = jwt.verify(token, process.env.SECRET_KEY!)

            if (_id) {
                const user = await Users.findById({ _id })

                if (!user) {
                    res.clearCookie('token', { sameSite: "none", secure: true, }).redirect('/auth/login')
                    return
                }
                res.json({ user })
                return
            }

        } catch (error) {
            res.clearCookie('token', { sameSite: "none", secure: true, })
            res.status(400).send('Invalid token!');
            return
        }
    }
    catch (error) {
        console.log(error)
        res.clearCookie('token', { sameSite: "none", secure: true, }).redirect('/auth/login')
        return
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        let { name, lastname, email, password } = req.body
        email = email.trim()
        const userExist = await Users.findOne({ email })
        if (userExist) {
            res.status(500).json({ mssge: 'Email currently registered, please use another one.' })
            return
        }

        const post = new Users({ name, lastname, email, password })
        await post.save();

        res.json({ message: 'ok' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ mssge: 'Error with the register process' })
        return
    }
}