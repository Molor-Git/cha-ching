require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

app.use(cookieParser());
// credentials: true sets up express to get cookie in request header. origin sets the client URL for server to accept requests
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("../server/routes/user.routes")(app);
require("../server/routes/post.routes")(app);
require("../server/routes/comment.routes")(app);
require("../server/routes/product.routes")(app);

const server = app.listen( process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`) );

//============= Socket.io

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        allowedHeaders: [ '*' ],
        credential: true,
    }
});

//start listening on clients wanting to connect
io.on("connection", (socket) => {
    console.log(`Server side of socket id: ${socket.id}`)

    // .on() is for listening to conversation / events from clients
    socket.on("added_product", (data) => {
        console.log(data)
        // emits an event to all clients other than this particular one that sent the original message
        socket.broadcast.emit("product_added", data);

    })

    socket.on("deleted_product", (data) => {
        console.log("Product removed - product ID: " + data);
        socket.broadcast.emit("product_deleted", data);
    })
});