import React, { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim() !== '') {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className='bg-gray-200 p-4'>
      <form onSubmit={handleSubmit} className='flex'>
        <input
          type='text'
          value={message}
          onChange={handleChange}
          className='flex-grow rounded-l-lg p-2 mr-2'
          placeholder='Введите сообщение...'
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg'
        >
          Отправить
        </button>
      </form>
    </div>
  )
}

export default ChatInput
