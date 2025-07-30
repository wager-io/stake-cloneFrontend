import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { LuSendHorizontal } from 'react-icons/lu'
import { MdOutlineEmojiEmotions, MdOutlineGifBox } from 'react-icons/md'
import { FiPaperclip } from 'react-icons/fi'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import EmojiPicker from 'emoji-picker-react'
import './styles/ChatAdmin.css'

const gf = new GiphyFetch('dc6zaTOxFJmzC')

export default function ChatAdmin({ onClose }) {
  const [chatStarted, setChatStarted] = useState(true)
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showGifPicker, setShowGifPicker] = useState(false)

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Message sent:', message)
      setMessage('')
    }
  }

  return (
    <div className="message-box">
      {chatStarted && (
        <>
          <div className="chat-header">
            <span className="chat-title">Wager.com</span>
            <button className="close-btn" onClick={onClose}>
              <IoClose />
            </button>
          </div>

          <div className="chat-body">
            <p className="placeholder">Need help? We've got your back.</p>
          </div>

          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={(emoji) => setMessage(prev => prev + emoji.emoji)} />
            </div>
          )}

          {showGifPicker && (
            <div className="gif-picker">
              <Grid
                width={260}
                columns={2}
                fetchGifs={(offset) => gf.trending({ offset, limit: 6 })}
                onGifClick={(gif) => {
                  setMessage(prev => prev + ' ' + gif.images.fixed_height.url)
                  setShowGifPicker(false)
                }}
              />
            </div>
          )}

          <div className="chat-input-bar">
            <div className="input-wrapper">
              <div className="icon-group">
                <button
                  className="input-icon"
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker)
                    setShowGifPicker(false)
                  }}
                >
                  <MdOutlineEmojiEmotions />
                </button>

                <button
                  className="input-icon"
                  onClick={() => {
                    setShowGifPicker(!showGifPicker)
                    setShowEmojiPicker(false)
                  }}
                >
                  <MdOutlineGifBox />
                </button>

                <label className="input-icon">
                  <FiPaperclip />
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        console.log('File selected:', file)
                      }
                    }}
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button className="send-button" onClick={handleSend}>
              <LuSendHorizontal />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
