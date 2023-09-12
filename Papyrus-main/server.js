const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const apiRoute = require("./routes/api-route");
const userRoute = require("./routes/user-route");

const isAuth = require("./middleware/is-auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api", isAuth, apiRoute);
app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(8080, () => {
  console.log("server started at 8080 ✔");
});
