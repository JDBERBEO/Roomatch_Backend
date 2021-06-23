require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db");
const roomieRouter = require('./routes/roomie.js')
const reservationRouter = require('./routes/reservation')
//const { auth } = require('.utils/middlewares')

const port = process.env.PORT || 8000
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/roomie', roomieRouter)
app.use ('/reservations', reservationRouter)

// app.get('/reservation', auth, (req,res) => {
//    res.status(200).json({ message: 'estas autenticado' })
// })

app.listen(8000, () => {
  console.log(`App runnig at http:/localhost:${port}`);
});
