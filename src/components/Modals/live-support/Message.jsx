import React, { useState } from 'react'
import { IoClose, IoChatboxOutline } from 'react-icons/io5'
import './styles/Message.css'
import { LuSendHorizontal } from "react-icons/lu";

export default function Messages({ isLoggedIn, setShowChatAdmin, onClose }) {
  const [message, setMessage] = useState('')
  const user = true


  const handleSend = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to send a message.')
    } else {
      console.log('Message sent:', message)
      setMessage('')
    }
  }

  return (
<div className="message-box">
  <div className="message-header">
    <span>Messages</span>
    <button className="close-btn" onClick={onClose}><IoClose /></button>
  </div>

  <div className="message-content">
    <div className="message-body">
      <IoChatboxOutline className="message-icon" />
      <h3>No messages</h3>
      <p>Messages from the team will be shown here</p>
    </div>

   <button
  className="special-message-btn"
  onClick={() => {
    setShowChatAdmin(true)
    setChatStarted(true)
  }}
>
  Send us a message <LuSendHorizontal />
</button>


    {isLoggedIn && (
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    )}
  </div>
</div>

  )
}
