import { editVacancy, getVacancy } from '@/API/vacancy.service'
import NoSSR from '@/components/Common/NoSSR'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { VacancyFields } from '@/utilities/interfaces'
import { isJSON } from '@/utilities/utilities'
import { useMutation, useQuery } from '@tanstack/react-query'
import { EditorState, convertToRaw } from 'draft-js'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useUserStore } from 'store/user'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false },
)

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<VacancyFields>()
  const { t } = useTranslation()
  const { user } = useUserStore()
  const { push, query } = useRouter()
  const { mutate } = useMutation(editVacancy)

  const { data, isLoading, isError } = useQuery(
    ['vacancy', query?.id as string],
    () =>
      getVacancy({
        id: Number(query?.id),
      }),
  )

  const [editor, setEditor] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (data) {
      setValue('title', data?.name)
      setValue('minSalary', data?.salary_min)
      setValue('maxSalary', data?.salary_max)
    }
  }, [data])

  const onSubmit = (data: VacancyFields) => {
    mutate(
      {
        id: Number(query?.id),
        name: data.title,
        content: JSON.stringify(convertToRaw(editor.getCurrentContent())),
        company: user?.id,
        salary_min: data.minSalary,
        salary_max: data.maxSalary,
      },
      {
        onSuccess: result => {
          push(`/vacancy/${result.id}`)
          toast.success('Vacancy successfully edited')
        },
        onError: () => {
          toast.error('Error while editing vacancy')
        },
      },
    )
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      <Head>
        <title>{`${t('Edit vacancy')} | GoIntern`}</title>
      </Head>
      <NoSSR>
        <Wrapper>
          <Container className='justify-self-center pt-10 flex flex-col mx-auto min-h-screen'>
            <h1 className='font-semibold text-lg'>Edit vacancy</h1>
            <div className='my-5 w-6/12 mx-auto'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label={t('Title')}
                  placeholder='We need Frontend developer'
                  {...register('title', { required: true })}
                  error={errors.title?.message}
                />
                <div className='flex flex-row w-full justify-between mt-2'>
                  <Input
                    {...register('minSalary', { required: true })}
                    label='Min. Salary'
                    placeholder='1000 ₸'
                    className='basis-[calc(50%_-_16px)]'
                  />
                  <Input
                    {...register('maxSalary', { required: true })}
                    label='Max. Salary'
                    placeholder='2000 ₸'
                    className='basis-[calc(50%_-_16px)]'
                  />
                </div>
                <div className='w-full mt-2'>
                  <span className='font-semibold text-sm inline-block'>
                    Content
                  </span>
                  <NoSSR>
                    <Editor
                      wrapperClassName='border-lightGray border-2 rounded-lg p-2 min-h-[200px]'
                      toolbar={{
                        options: [
                          'inline',
                          'blockType',
                          'fontSize',
                          'list',
                          'textAlign',
                          'link',
                          'embedded',
                          'emoji',
                          'image',
                          'remove',
                          'history',
                        ],
                      }}
                      initialContentState={
                        data?.content && isJSON(data?.content)
                          ? JSON.parse(data?.content)
                          : data?.content ?? ''
                      }
                      onEditorStateChange={state => setEditor(state)}
                    />
                  </NoSSR>
                </div>
                <Button className='mt-2'>Edit</Button>
              </form>
            </div>
          </Container>
        </Wrapper>
      </NoSSR>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
