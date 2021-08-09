const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

corsOptions = {
    cors: true,
    origins: ["https://amogh-socket-io-chat-app.netlify.app"],

    methods: ["GET", "POST"],
    credentials: true,
}
const io = require("socket.io")(server, corsOptions);
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users")

const PORT = process.env.PORT || 5000

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })

const router = require("./router")
app.use(router)

io.on("connection", socket => {
    console.log("User has joined the room")

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) {
            return callback(error)
        }

        socket.emit("message", { user: "admin", text: `${user.name} welcome to the room ${user.room}.` })
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined.` })

        socket.join(user.room)

        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })

    socket.on("send-message", (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit("message", { user: user.name, text: message })
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })

    io.on("disconnect", () => {
        console.log("User has left the room")
    })
})

