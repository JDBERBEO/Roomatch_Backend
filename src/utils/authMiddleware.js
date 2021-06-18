const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("session expired");
    }
    //hacer un console log para ver como se recibe el authorization

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("session expired");
    }

    //verificar que el userId si se llame así en la
    //propiedad del jwt.sign del signup controller
    //crear el env con la palabra SECRET
    const { userId } = jwt.verify(token, process.env.SECRET);

    //esto crea una propiedad dentro del request? puede ser ej: req.payload o cualquier otro nombre?
    //opinión acerca de la librería http-errors
    req.user = userId;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//requerir en las rutas
module.exports = { authMiddleware };
