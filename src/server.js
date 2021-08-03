require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db");
const roomieRouter = require("./routes/roomie.js");
const reservationRouter = require("./routes/reservation");
const inspectorRouter = require("./routes/inspector");
const hostRouter = require("./routes/userHost");
const spaAdver = require("./routes/spaAdver");
const {verify} = require("./utils/mailer")

const port = process.env.PORT || 8000;
const app = express();
connect();
verify()

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(morgan("dev"));

app.use("/reservations", reservationRouter);
app.use("/inspectors", inspectorRouter);
app.use("/roomie", roomieRouter);
app.use("/host", hostRouter);
app.use("/advertisements", spaAdver);
app.listen(8000, () => {
  console.log(`App runnig at http://localhost:${port}`);
});
