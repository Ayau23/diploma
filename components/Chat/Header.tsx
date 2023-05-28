import React from 'react'

interface ChatHeaderProps {
  chatName: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatName }) => {
  return (
    <div className='bg-gray-200 p-4'>
      <h2 className='text-xl font-bold'>{chatName}</h2>
    </div>
  )
}

export default ChatHeader
