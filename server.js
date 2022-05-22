const app = require("./app");
const mongoose = require("mongoose");
const cluster = require("cluster");
const os = require("os");

const cpuCount = os.cpus().length;

//CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECTION_STRING, () =>
  console.log("Connected to DB!")
);

//LISTEN

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  app.listen(process.env.PORT || 3000, () =>
    console.log(
      `🚀 server ${process.pid} is running on port ${process.env.PORT || 3000}!`
    )
  );
}
