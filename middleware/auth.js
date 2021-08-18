const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //middleware function has access to response and req cycle
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); //not authorized
  }

  //verify token

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); //decodes token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
