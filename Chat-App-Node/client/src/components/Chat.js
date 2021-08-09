/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"
import InfoBar from "./InfoBar"
import Input from "./Input"
import Messages from "./Messages"

import "../styles/chat/chat.scss"

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const ENDPOINT = "https://amogh-socket-io-chat-server.herokuapp.com"

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        setName(name)
        setRoom(room)

        socket = io(ENDPOINT)

        socket.emit("join", { name, room }, () => { })

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on("message", (message) => {

            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit("send-message", message, () => setMessage(""))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
