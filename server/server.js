require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// credentials: true sets up express to get cookie in request header. origin sets the client URL for server to accerpt requests
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("../server/routes/user.routes")(app);
require("../server/routes/post.routes")(app);
require("../server/routes/comment.routes")(app);
require("../server/routes/product.routes")(app);

// const jwt = require("jsonwebtoken");
// var token = jwt.sign({ foo: "bar" }, process.env.SECRET_KEY);
// console.log("token :", token);
// const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
// console.log(decodeToken)

app.listen( process.env.PORT, () => 
console.log(`Listening on port: ${process.env.PORT}`) );