const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    const { id, cod_fisc } = jwt.decode(token, process.env.JWT_SECRET);
    req.userId = id;
    req.cod_fisc = cod_fisc;
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};
module.exports = authMiddleware;
