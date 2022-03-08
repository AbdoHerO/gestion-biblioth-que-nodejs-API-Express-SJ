const jwt = require("jsonwebtoken")


exports.adminAuth = (req, res, next) => {
    const token = req.header("auth-token")
    if (token) {
      jwt.verify(token, process.env.TOKEN_SCRET, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }

exports.userAuth = (req, res, next) => {

    const token = req.header("auth-token")
    if (token) {
        jwt.verify(token, process.env.TOKEN_SCRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "user") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}