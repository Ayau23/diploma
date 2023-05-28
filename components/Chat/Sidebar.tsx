import React from 'react'

interface Chat {
  id: number
  name: string
}

interface ChatSidebarProps {
  chats: Chat[]
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats }) => {
  return (
    <div className='bg-gray-100 p-4'>
      <h3 className='text-lg font-bold mb-2'>Список чатов</h3>
      <ul className='space-y-2'>
        {chats.map(chat => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ChatSidebar
