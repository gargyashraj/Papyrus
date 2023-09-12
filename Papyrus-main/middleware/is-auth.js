const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const tokenString = req.headers["authorization"];
  //console.log("tokenString", tokenString);
  if (tokenString) {
    const token = tokenString && tokenString.split(" ")[1];
    req.token = token;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_TOKEN , (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded;

        next();
      }
    });
  }
};
