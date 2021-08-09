import React from 'react'
import ReactScrollToBottom from "react-scroll-to-bottom"
import Message from './Message'

import "../styles/messages/messages.scss"

const Messages = ({ messages, name }) => {
    return (
        <ReactScrollToBottom className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ReactScrollToBottom>
    )
}

export default Messages
