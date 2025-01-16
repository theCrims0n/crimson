import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const createJWT = (_id : any, email = '', password = '') => {

    return new Promise((resolve, reject) => {

        const payload = { _id, email, password }

        jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '8h' }, (err, token) => {
            if (err) {
                console.log(err)
                reject('Token failed')
            }
            else {
                resolve(token)
            }
        })
    })
}

export const validateJWT = (req: Request, res: Response, next: any) => {

    const { token } = req.cookies

    if (!token) {
        res.clearCookie('token')
        return res.status(401).json({ msg: 'Invalid or expired token' })
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY!)
        next();
    }
    catch (error) {
        console.log(error)
        res.clearCookie('token')
        return res.status(401).json({ msg: 'Invalid or expired token' })
    }
}