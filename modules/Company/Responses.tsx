import { editResponse } from '@/API/response'
import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import { Popover } from '@/components/UI/Popover'
import {
  mdiCancel,
  mdiCheckBold,
  mdiCheckCircle,
  mdiDotsHorizontal,
  mdiWindowClose,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { t } from 'i18next'
import toast from 'react-hot-toast'

interface Props {
  responses: components['schemas']['Response'][]
}

export const Responses = ({ responses }: Props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(editResponse)

  return (
    <div className='flex flex-row flex-wrap'>
      <>
        {responses.map(response => (
          <div
            key={response.id}
            className='text-sm basis-[calc(50%_-_10px)] sm:basis-full bresponse bresponse-[#E9EAE8] p-[15px] rounded-lg'
          >
            <div className='flex justify-between w-full flex-row items-start'>
              <p className='font-semibold'>
                {response.client?.first_name} {response.client.last_name}
              </p>
              <Popover
                head={
                  <Button className='bg-transparent right-3 w-6 h-6 shrink-0'>
                    <Icon path={mdiDotsHorizontal} size={1} color='#3B3F32' />
                  </Button>
                }
                body={
                  <div>
                    <Button
                      className='bg-transparent !text-dark hover:bg-[#F6F6F5] px-2 py-2'
                      onClick={() => {
                        mutate(
                          {
                            id: response.id,
                            status: true,
                          },
                          {
                            onSuccess: () => {
                              toast.success('Changes saved')
                              queryClient.refetchQueries([
                                'responses',
                                response.vacancy.id,
                              ])
                            },
                            onError: () => {
                              toast.error(t('errorOccuredTryAgain'))
                            },
                          },
                        )
                      }}
                    >
                      <Icon
                        className='mr-3 text-green'
                        path={mdiCheckBold}
                        size={1}
                      />
                      Invite
                    </Button>
                    <Button
                      className='bg-transparent !text-dark hover:bg-[#F6F6F5] px-2 py-2'
                      onClick={() => {
                        mutate(
                          {
                            id: response.id,
                            status: false,
                          },
                          {
                            onSuccess: () => {
                              toast.success('Changes saved')
                              queryClient.refetchQueries([
                                'responses',
                                response.vacancy.id,
                              ])
                            },
                            onError: () => {
                              toast.error(t('errorOccuredTryAgain'))
                            },
                          },
                        )
                      }}
                    >
                      <Icon
                        className='mr-3 !text-[#D84343]'
                        path={mdiWindowClose}
                        size={1}
                      />
                      Reject
                    </Button>
                  </div>
                }
              />
            </div>
            <p className='mt-2'>
              {response.vacancy.salary_min} - {response.vacancy.salary_max} тг.
            </p>
            <p className='mt-1 text-gray'>{response.vacancy?.name}</p>
            <span className='block bg-gray h-[0.33px] my-[10px]' />
            <p
              className={clsx(
                'flex items-center gap-x-3 ',
                response.status ? 'text-green' : 'text-red',
              )}
            >
              <Icon
                path={response.status ? mdiCheckCircle : mdiCancel}
                size={1}
                className={clsx(response.status ? 'text-green' : 'text-red')}
              />
              {response.status !== null
                ? response.status
                  ? 'Invited'
                  : 'Rejected'
                : 'Not yet answered'}
            </p>
          </div>
        ))}
      </>
    </div>
  )
}
