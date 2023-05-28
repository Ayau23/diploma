import { components } from '@/API/types/api.types'
import { deleteVacancy } from '@/API/vacancy.service'
import { Confirm } from '@/components/Modal/Confirm'
import { Button } from '@/components/UI/Button'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useState } from 'react'
import toast from 'react-hot-toast'

interface Props extends ComponentPropsWithoutRef<'div'> {
  vacancy: components['schemas']['Vacancy']
}

export const Card = ({ vacancy, className }: Props) => {
  const queryClient = useQueryClient()
  const [isConfirm, setIsConfirm] = useState(false)

  return (
    <>
      <Confirm
        isVisible={isConfirm}
        onClose={() => setIsConfirm(false)}
        requestFunction={deleteVacancy}
        requestArg={vacancy.id}
        onSuccess={() => {
          toast.success('Deleted successfully')
          queryClient.refetchQueries(['my', 'vacancies'])
          setIsConfirm(false)
        }}
        onError={() => {
          toast.error('Something went wrong, try again later')
          setIsConfirm(false)
        }}
      />
      <div
        className={clsx(
          ' border-lightGray border rounded-lg relative basis-[calc(50%_-_16px)] flex flex-col xs:max-w-none lg:basis-52 xs:basis-10/12 xs:mb-5',
          className,
        )}
      >
        <div className='w-full px-3 py-3 rounded-lg border-t-0'>
          <Link href={`/vacancy/${vacancy.id}`}>
            <p className='font-semibold text-sm mb-1'>{vacancy.name}</p>
          </Link>
          <span className='text-gray font-normal mb-2 inline-block'>
            {vacancy.salary_min} тг. - {vacancy.salary_max} тг.
          </span>
          <div className='flex flex-row items-center justify-between w-full'>
            <Link
              href={`/company/vacancy/responses/${vacancy.id}`}
              className='text-green font-medium mr-2 justify-self-start'
            >
              See responses
            </Link>
            <div className='flex flex-row items-center justify-end'>
              <Link
                href={`/company/vacancy/edit?id=${vacancy.id}`}
                className='text-green font-medium mr-2'
              >
                Edit
              </Link>
              <Button onClick={() => setIsConfirm(true)} className='w-28 py-2'>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
