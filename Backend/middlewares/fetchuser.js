const jwt = require('jsonwebtoken');
const JWTSecret = "mp908090"


const fetchuser = async(req,res,next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "use valid token" })
    }
    try {
        const data =jwt.verify(token, JWTSecret)
        req.user =await data.user
        next()

    } catch (error) {
        res.status(401).send({ error: "use valid token" })

    }
}

module.exports = fetchuser;