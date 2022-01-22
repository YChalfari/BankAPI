const express = require("express");
const path = require("path");
const cors = require("cors");
require("./src/db/mongoose");
const userRoutes = require("./src/routes/user.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("listen on port " + port);
});
