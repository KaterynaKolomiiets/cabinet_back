const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");


const userRouter = require("./routes/routes");

const app = express();

// deploy?
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// deploy

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options("*", cors());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use("/", userRouter);

module.exports = app;
