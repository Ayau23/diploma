import { components } from '@/API/types/api.types'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useState } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
  response: components['schemas']['Response']
}

export const Card = ({ response, className }: Props) => {
  return (
    <>
      <div
        className={clsx(
          ' border-lightGray border rounded-lg relative basis-[calc(50%_-_16px)] flex flex-col xs:max-w-none lg:basis-52 xs:basis-10/12 xs:mb-5',
          className,
        )}
      >
        <div className='w-full px-3 py-3 rounded-lg border-t-0'>
          <Link href={`/response/${response.id}`}>
            <p className='font-semibold text-sm mb-1'>
              {response.vacancy.name}
            </p>
          </Link>
          <span className='text-gray font-normal mb-2 inline-block'>
            {response.vacancy.salary_min} тг. - {response.vacancy.salary_max}{' '}
            тг.
          </span>

          <br />
          <span className={clsx(response.status ? 'text-green' : 'text-red')}>
            {response.status !== null
              ? response.status
                ? 'Invited'
                : 'Rejected'
              : 'Not yet answered'}
          </span>
        </div>
      </div>
    </>
  )
}
