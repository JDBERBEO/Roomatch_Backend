const mongoose = require("mongoose");
function connect() {
  const mongoURI = "mongodb://localhost:27017/roomatch";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(mongoURI, options)
    .then(() => {
      console.log("Connection established successfully");
    })
    .catch((error) => {
      console.log("Something went wrong", error);
    });
}

module.exports = connect;
