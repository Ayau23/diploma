import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { useState } from 'react'
import { Textarea } from '../UI/Textarea'

interface Props {
  isVisible: boolean
  onClose: () => void
  onConfirm: (text: string) => void
}

export const Response = ({ isVisible, onClose, onConfirm }: Props) => {
  const [text, setText] = useState('')

  return (
    <Modal className='max-w-lg p-6' isVisible={isVisible} onClose={onClose}>
      <Textarea
        rows={10}
        onChange={event => setText(event.target.value)}
        label='Response letter'
        className='mb-4'
        placeholder='Write your message here (not required))'
      />
      <Button
        onClick={() => {
          onConfirm(text)
          onClose()
        }}
      >
        Leave response
      </Button>
    </Modal>
  )
}
