import { authorizeClient } from '@/API/client.service'
import { authorizeCompany } from '@/API/company.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiEmail, mdiLock } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'store/user'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { AuthorizationFields } from 'utilities/interfaces'

const Main = () => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const { mutate: _authorizeClient } = useMutation(authorizeClient)
  const { mutate: _authorizeCompany } = useMutation(authorizeCompany)
  const [isEmployee, setIsEmployee] = useState(true)
  const { addUser } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationFields>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: AuthorizationFields) => {
    setIsLoading(true)
    if (isEmployee) {
      _authorizeClient(
        {
          password: data.password,
          email: data.email,
        },
        {
          onSuccess: response => {
            localStorage.setItem('accessToken', response.access_token)
            localStorage.setItem('refreshToken', response.refresh_token)
            addUser({
              pick: 'client',
              id: response.id,
              email: data.email,
              client: {
                firstName: response.first_name ?? '',
                lastName: response.last_name ?? '',
              },
            })
            push('/client/profile')
          },
        },
      )
    } else {
      _authorizeCompany(
        {
          password: data.password,
          email: data.email,
        },
        {
          onSuccess: response => {
            localStorage.setItem('accessToken', response.access_token)
            localStorage.setItem('refreshToken', response.refresh_token)
            addUser({
              pick: 'company',
              id: response.id,
              email: data.email,
              company: {
                name: response.company_name ?? '',
                description: response.company_description ?? '',
              },
            })
            push('/company/profile')
          },
        },
      )
    }
  }

  return (
    <>
      <Head>
        <title>Авторизация | GoIntern</title>
      </Head>
      <Wrapper>
        <Container className='flex flex-row items-center h-screen justify-around mx-auto'>
          <div className='basis-4/12 lg:basis-full'>
            <h1 className='font-semibold text-xl text-center mb-7'>
              {t('Login')}
            </h1>
            <div>
              <p className='text-center mb-4'>{t('Choose account type')}</p>
              <div className='flex text-sm gap-x-4 justify-center font-semibold text-center'>
                <span
                  className={clsx(
                    'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer basis-full',
                    isEmployee ? 'border-[#86A545]' : 'border-[#BFBFBF]',
                  )}
                  onClick={() => setIsEmployee(true)}
                >
                  <span
                    className={clsx(
                      'text-center block',
                      isEmployee ? 'text-[#86A545]' : 'text-[#BFBFBF]',
                    )}
                  >
                    {t('Employee')}
                  </span>
                </span>

                <span
                  className={clsx(
                    'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer basis-full',
                    !isEmployee ? 'border-[#86A545]' : 'border-[#BFBFBF]',
                  )}
                  onClick={() => setIsEmployee(false)}
                >
                  <span
                    className={clsx(
                      'text-center block',
                      !isEmployee ? 'text-[#86A545]' : 'text-[#BFBFBF]',
                    )}
                  >
                    {t('Company')}
                  </span>
                </span>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center my-7 flex-nowrap'>
              <span className='bg-[#D9D9D9] h-[1px] basis-full' />
            </div>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('email', {
                  required: 'Заполните поле',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Неверный формат email',
                  },
                })}
                className='mb-5'
                error={errors.email?.message}
                placeholder='Введите e-mail'
                label='E-mail'
                icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
              />
              <Input
                {...register('password', {
                  required: 'Заполните поле',
                  validate: value => {
                    if (value.length < 8) {
                      return 'Пароль должен быть не менее 8 символов'
                    }
                    if (value === value.toLowerCase()) {
                      return 'Пароль должен содержать заглавную букву'
                    }
                    if (value === value.toUpperCase()) {
                      return 'Пароль должен содержать строчную букву'
                    }
                    if (!/\d/.test(value)) {
                      return 'Пароль должен содержать одну цифру'
                    }
                  },
                })}
                error={errors.password?.message}
                type='password'
                placeholder={`${t('enterPassword')}`}
                label={`${t('password')}`}
                icon={<Icon color='#BFBFBF' path={mdiLock} size={1} />}
              />
              <Link
                href='/forgot/password'
                className='font-semibold text-sm text-green inline-block mt-2 self-end'
              >
                {t('Forgot password')}
              </Link>
              <Button className='mt-5'>{t('Sign in')}</Button>
              <p className='font-semibold text-lightDark text-sm mt-7 mx-auto'>
                {t('Don"t have an account')}{' '}
                <Link href='/auth/registration' className='text-green'>
                  {t('Sign up')}
                </Link>
              </p>
            </form>
          </div>
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
