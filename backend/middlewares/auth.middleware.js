import jwt from 'jsonwebtoken'
import handleError from '../utils/handleError.js'


const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return handleError(res, 401, 'Authentication token is missing')
        }
        const verifytoken= jwt.verify(token, process.env.JWT_SECRET)

        req.userId= verifytoken.userId
        req.role = verifytoken.role
        next()
    }
    catch (error) {
        console.error('Authentication error:', error)
        return handleError(res, 500, 'Internal server error')
    }
}

export default isAuth
