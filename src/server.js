require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db");
const roomieRouter = ('./routes/roomie.js')
const reservationRouter = require('./routes/reservation')

const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/roomie', roomieRouter)
app.use ('/reservations', reservationRouter)

app.listen(8000, () => {
  console.log("app running at http://localhost:8000");
});
