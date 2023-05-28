import { createResponse } from '@/API/response'
import { components } from '@/API/types/api.types'
import { Response } from '@/components/Modal/Response'
import { Button } from '@/components/UI/Button'
import { isJSON } from '@/utilities/utilities'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { EditorState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, useState } from 'react'
import toast from 'react-hot-toast'

interface Props extends ComponentPropsWithoutRef<'div'> {
  vacancy: components['schemas']['Vacancy']
}
export const Info = ({ className, vacancy }: Props) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMutation(createResponse)
  const [isResponse, setIsResponse] = useState(false)

  const formattedProgram = isJSON(vacancy.content)
    ? stateToHTML(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(vacancy.content)),
        ).getCurrentContent(),
      )
    : vacancy.content

  const createResponseHandler = async (text: string) => {
    mutate(
      {
        response_text: text ?? '',
        id: vacancy.id,
      },
      {
        onSuccess: () => {
          toast.success(t('Response sent'))
        },
        onError: () => {
          toast.error(t('Something went wrong, try again later'))
        },
      },
    )
  }

  return (
    <>
      <Response
        isVisible={isResponse}
        onClose={() => setIsResponse(false)}
        onConfirm={text => {
          createResponseHandler(text)
        }}
      />
      <div className={clsx(className)}>
        <h1 className='text-xl font-semibold mb-2 mt-8'>{vacancy.name}</h1>
        <p className='flex mb-3'>
          <span className='text-gray text-md '></span>
        </p>
        <div dangerouslySetInnerHTML={{ __html: formattedProgram }} />

        <Button
          onClick={() => setIsResponse(true)}
          disabled={isLoading}
          isLoading={isLoading}
          className='mt-auto mb-6'
        >
          {t('Response')}
        </Button>
      </div>
    </>
  )
}
