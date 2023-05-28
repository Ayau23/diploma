import { Button } from '../UI/Button'
import { Modal } from '../UI/Modal'

interface Props<T> {
  isVisible: boolean
  onClose: () => void
  requestFunction: (arg: T) => void
  requestArg: T
  onSuccess?: () => void
  onError?: () => void
}

export const Confirm = <T,>({
  isVisible,
  onClose,
  requestFunction,
  requestArg,
  onSuccess,
  onError,
}: Props<T>) => {
  const handleConfirm = async () => {
    try {
      await requestFunction(requestArg)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      if (onError) {
        onError()
      }
    }
    onClose()
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} className='max-w-md p-8'>
      <div>
        <p className='text-dark-blue font-medium text-xl text-center'>
          Do you wan&apos;t to delete this vacancy?
        </p>
        <div className='flex justify-center gap-x-20'>
          <Button
            type='button'
            onClick={onClose}
            className='mt-6 mr-4 bg-blue w-max px-4'
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={handleConfirm}
            className='mt-6 mr-4 !bg-red w-max px-4'
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
