import { getMe } from '@/API/client.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { ClientFields } from '@/utilities/interfaces'
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
  } = useForm<ClientFields>()
  const { locale, pathname } = useRouter()
  const { user } = useUserStore()
  const { data, isLoading, isError } = useQuery(['me', user?.id], () => getMe())

  useEffect(() => {
    if (data) {
      setValue('firstName', data?.first_name ?? '')
      setValue('lastName', data?.last_name ?? '')
      setValue('email', data?.email)
      setValue('phone', data?.phone)
    }
  }, [data])

  const onSubmit = (data: ClientFields) => {
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
                  pathname === '/client/profile' && 'border-green text-green',
                )}
                href={'/client/profile'}
              >
                Profile
              </Link>
              <Link
                className={clsx(
                  'px-4 py-2 text-sm border border-[#E9EAE8] rounded-lg font-semibold capitalize',
                  pathname === '/client/responses' && 'border-green text-green',
                )}
                href={'/client/responses'}
              >
                Responses
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
                  src={`https://ui-avatars.com/api/?name=${data.first_name}&size=128&font-size=0.55&rounded=true&background=ededed&color=86A545&format=svg`}
                />
              </div>
              <div className='grow flex flex-col'>
                <Input
                  error={errors.firstName?.message}
                  {...register('firstName', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5'
                  label='First name'
                  placeholder='Mikhail '
                  icon={
                    <Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
                  }
                />
                <Input
                  error={errors.lastName?.message}
                  {...register('lastName', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5'
                  label='Last name'
                  placeholder=' Petrovich'
                  icon={
                    <Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
                  }
                />
                <Input
                  error={errors.email?.message}
                  disabled={true}
                  {...register('email', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5 h-30'
                  label='Email'
                  placeholder='info@example.com'
                  icon={
                    <Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
                  }
                />
                <Input
                  error={errors.phone?.message}
                  disabled={true}
                  {...register('phone', {
                    required: `${t('Field should not be empty')}`,
                  })}
                  className='mb-5 h-30'
                  label='Email'
                  placeholder='+77088282896'
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
