import { searchVacancies } from '@/API/vacancy.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Search } from '@/modules/Search'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Main = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { data, isLoading, isError } = useQuery(['tours', query.text], () =>
    searchVacancies(String(query?.text ?? '')),
  )

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>{`${query.text} | GoIntern`}</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 flex flex-col mx-auto xs:pt-0'>
          <Search />
          {data.length ? (
            <Cards title={t('Found vacancies')} vacancies={data} />
          ) : (
            <span className=' font-medium inline-block mt-8 ml-2'>
              No vacancies was found
            </span>
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
