const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, "todo")
            if (decoded) {
                console.log(decoded)
                req.body.userId = decoded.user_Id
                req.body.user = decoded.user
                next()
            }
            else {
                res.send({ err: "Please Login First!" })
            }
        } catch (error) {
            res.send({ err: "Please Login First!" })
        }
    }
    else {
        res.send({ err: "Please Login First!" })
    }
}


module.exports={auth}
