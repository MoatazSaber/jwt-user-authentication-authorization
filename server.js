const app = require("./app");
const mongoose = require("mongoose");

//CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECTION_STRING, () =>
  console.log("Connected to DB!")
);

//LISTEN
app.listen(process.env.PORT || 3000, () =>
  console.log(`server is running on port ${process.env.PORT || 3000}!`)
);
