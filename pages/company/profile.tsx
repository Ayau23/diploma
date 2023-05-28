import { getMe } from '@/API/company.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { CompanyFields } from '@/utilities/interfaces'
import { mdiAccount } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { t } from 'i18next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'store/user'

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CompanyFields>()
  const { locale, pathname } = useRouter()
  const { user } = useUserStore()
  const { data, isLoading, isError } = useQuery(['me', user?.id], () => getMe())

  useEffect(() => {
    setValue('name', data?.company_name ?? '')
    setValue('description', data?.company_description ?? '')
  }, [data])

  const onSubmit = (data: CompanyFields) => {
    console.log(data)
  }

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>GoIntern | Company Profile</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-x-3 '>
              <Link
                className={clsx(
                  'px-4 py-2 text-sm border border-[#E9EAE8] rounded-lg font-semibold capitalize',
                  pathname === '/company/profile' && 'border-green text-green',
                )}
                href={'/company/profile'}
              >
                Profile
              </Link>
              <Link
                className={clsx(
                  'px-4 py-2 text-sm border border-[#E9EAE8] rounded-lg font-semibold capitalize',
                  pathname === '/company/vacancy' && 'border-green text-green',
                )}
                href={'/company/vacancy'}
              >
                Vacancies
              </Link>
            </div>
            <div className='w-6/12 mx-auto flex flex-row gap-x-8 border border-gray p-4 rounded-lg mt-10'>
              <div className='relative flex items-center mx-auto '>
                <Image
                  height={156}
                  width={156}
                  alt='User photo'
                  style={{
                    objectFit: 'cover',
                  }}
                  className='rounded-full'
                  unoptimized
                  src={`https://ui-avatars.com/api/?name=${data.company_name}&size=128&font-size=0.55&rounded=true&background=ededed&color=86A545&format=svg`}
                />
              </div>
              <div className='grow flex flex-col'>
                <Input
                  error={errors.name?.message}
                  {...register('name', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5'
                  label='Company name'
                  placeholder='Mikhail Petrovich'
                  icon={
                    <Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
                  }
                />
                <Input
                  error={errors.description?.message}
                  {...register('description', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5 h-30'
                  label='Company description'
                  placeholder='Mikhail Petrovich'
                  icon={
                    <Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
                  }
                />
              </div>
            </div>
            <div className='w-6/12 mx-auto'>
              <Button className='w-20 ml-auto mt-5'>Save</Button>
            </div>
          </form>
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
