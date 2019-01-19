require("dotenv").config();
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      morgan = require("morgan"),
      jwt = require("jsonwebtoken"),
      mongoose = require("mongoose"),
      db = require("./models"),
      pollRoutes = require("./routes/poll"),
      authRoutes = require("./routes/auth"),
      resetRoutes = require("./routes/reset"),
      userRoutes = require("./routes/user"),
      errorHandler = require("./handlers/error"),
      PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.get("/test", function(req, res, next){
  // var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  res.send(req.ip);
});

app.use("/api/auth", authRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/poll", pollRoutes);
app.use("/api/user", userRoutes);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log("Running on port 8080!");
});
