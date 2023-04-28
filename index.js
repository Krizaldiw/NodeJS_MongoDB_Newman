const express = require("express");
const app = express();
require("dotenv").config();

//DB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//DB Connection Status
const CheckDB = mongoose.connection;
CheckDB.on("error", (error) => {
    console.log(error)
});

CheckDB.once("open", () => {
    console.log("Database Connected")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Const User Router
const userRouter = require("./routes/userRoute");
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`)
});