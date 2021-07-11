const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers.authorization; //Authorization
    
    if (!authorization) {
      throw new Error('Your session has expired');
    }
    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error('Your session has expired');
    }
    const { id } = jwt.verify(token, "" + process.env.SECRET);
 
    req.roomie = id ;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
