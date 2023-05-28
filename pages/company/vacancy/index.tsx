import { getMyVacancies } from '@/API/vacancy.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Company/Cards'
import { Layout } from '@/modules/Layout'
import { mdiMessageImage, mdiPlus, mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Main = () => {
  const { t } = useTranslation()
  const { push, pathname } = useRouter()

  const {
    data: vacancies,
    isLoading,
    isError,
  } = useQuery(['my', 'vacancies'], () => getMyVacancies())

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>GoIntern</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
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

          {vacancies.length > 0 ? (
            <Cards title={t('Vacancies')} vacancies={vacancies} />
          ) : (
            <>
              <div className='mx-auto my-auto w-80 mt-20'>
                <div className='border rounded-lg border-lightGray p-5 animate-pulse'>
                  <Icon
                    className='mx-auto block mb-5'
                    color='#BFBFBF'
                    path={mdiMessageImage}
                    size={2.5}
                  />
                  <div className='w-full h-3 bg-gray rounded-full' />
                  <div className='flex mt-2.5 gap-x-2.5'>
                    <div className='basis-5/12 h-3 bg-lightGray rounded-full' />
                    <div className='basis-7/12 h-3 bg-lightGray rounded-full' />
                  </div>
                  <span className='flex flex-row gap-[2px] mt-4'>
                    {[1, 2, 3, 4, 5].map(element => (
                      <Icon
                        key={element}
                        path={mdiStar}
                        size={0.7}
                        color='#FFCE1F'
                      />
                    ))}
                  </span>
                </div>
                <p className='text-lg mt-12 text-center mb-8'>
                  You don&apos;t have vacancies
                </p>
                <Button
                  className='w-8/12 mx-auto'
                  onClick={() => {
                    push('/company/vacancy/add')
                  }}
                >
                  {t('Create vacancy')}
                </Button>
              </div>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
