import React from 'react'
import ChatInput from './Input'

interface Message {
  id: number
  text: string
  isSender: boolean
}

interface ChatContentProps {
  messages: Message[]
}

const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
  return (
    <div className='p-4'>
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.isSender ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              message.isSender ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <ChatInput
        onSendMessage={function (message: string): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default ChatContent
