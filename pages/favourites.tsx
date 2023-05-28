import { getFavourites } from '@/API/vacancy.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { useFavouritesStore } from 'store/favourites'

const Main = () => {
  const { t } = useTranslation()
  const { favourites } = useFavouritesStore()

  const {
    data: vacancies,
    isLoading,
    isError,
  } = useQuery(['favourites'], () => getFavourites(favourites))

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>GoIntern</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
          <Cards title={t('Vacancies')} vacancies={vacancies} />
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
