const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js")
const movieRouter = require("./routes/movieRoutes.js")
const movieListRouter = require('./routes/movielistRoutes.js')

// Password Security
dotenv.config();


// Home Route Test Added

app.get("/",(req,res) => {
    res.send("Netflix Server Working")
})

// Json Read Middleware


// Router Level Middleware

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/movies", movieRouter);
app.use("/api/movielist", movieListRouter);

// Connecting MONGODB

mongoose.connect(process.env.MONGOURL)

app.listen(8080, () => console.log("Backend Server is Running ⚡⚡"));
