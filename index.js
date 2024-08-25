const express = require("express");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;
const { router1 } = require("./routes/imgtoFirebase");
const { router } = require("./routes/route");

app.use(
  cors({
    origin: "*",
  })
);
// Middleware
app.use(express.json());


// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});
dbConnect();
app.use("/v1", router);
app.use("/v1", router1);

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
