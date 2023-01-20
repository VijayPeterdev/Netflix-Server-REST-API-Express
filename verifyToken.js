const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
     jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
       req.user = user;
      next();
    });
  } else {
    return res.status(401).json("your are not authenticated!");
  }
};

module.exports = verifyToken;
