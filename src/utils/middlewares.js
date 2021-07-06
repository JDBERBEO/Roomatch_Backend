const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers; //Authorization
    if (!authorization) {
      throw new Error("su sesion expiró");
    }
    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("su sesion expiró");
    }
    const { userId } = jwt.verify(token, "" + process.env.SECRET);
    console.log(userId);
    req.roomie = userId;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
