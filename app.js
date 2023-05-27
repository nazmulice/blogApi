const express = require('express');
const app = express();
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require('helmet');
const cors = require('cors');

const errorHandler = require("./middleware/errorHandler");
const blogPostsRouter = require("./routes/api/blogPosts");
const authRouter = require("./routes/api/auth");

//db connection
require('./config/db');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());
app.use(helmet());
app.use(cors());


//home
app.get('/', (req, res) => {
  res.send("Hello mongodb")
});


//routing
app.use("/api/blogPosts", blogPostsRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

//route error
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


module.exports = app;
