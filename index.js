const express = require("express");
const app = express();
require("dotenv").config();
const moment = require("moment-timezone");
// const swaggerjsdoc = require("swagger-jsdoc");
// const swaggerui = require("swagger-ui-express");

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

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Newman - API Docs",
//             version: "1.0.0",
//             description: "This Simple API Using NodeJS, Express And Testing API Using Newman As JavaScript Library",
//             contact: {
//                 name: "Newman Documentation",
//                 url: "https://github.com/Krizaldiw",

//             },
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000/",
//             },
//         ],
//     },
//     apis: ["./routes/*.js"], 
// }

// const spacs = swaggerjsdoc(options)
// app.use(
//     "/api-docs", 
//     swaggerui.serve, 
//     swaggerui.setup(spacs)
// )


app.listen(process.env.PORT, () => {
    const jakartaTime = moment.tz(Date.now(), "Asia/Jakarta").format("dddd, YYYY-MM-DD HH:mm:ss");
    console.log(`Server Running on Port ${process.env.PORT} at ${jakartaTime} WIB`);
  });