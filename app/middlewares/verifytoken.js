import config from '../../config'
import jwt from 'jsonwebtoken'

class VerifyToken {
    constructor(){}

    static validate(){
        return (req, res, next) => {
            	let token = req.body.token || req.query.token || req.headers['x-access-token']
                if (token) {
                    jwt.verify(token, config.apisecret, (err, decoded) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: 'API authentication failed'
                            })
                        } else {
                            req.decoded = decoded
                            next()
                        }
                    })
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'No token provided'
                    })
                }
        }
    }
}

export default VerifyToken