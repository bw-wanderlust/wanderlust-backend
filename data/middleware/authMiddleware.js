require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: user => {
    console.log("fire");
    console.log("auth user", user);
    const payload = {
      username: user.username
    };
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: "30m"
    };
    console.log("token from auth", jwt.sign(payload, secret, options));
    return jwt.sign(payload, secret, options);
  },

  authenticate: (req, res, next) => {
    const token = req.get("Authorization");

    if (token) {
      jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) return res.status(401).json(err);

        req.decoded = decoded;

        next();
      });
    } else {
      return res.status(401).json({
        error: "No token provided, must be set on the Authorization Header"
      });
    }
  }
};
