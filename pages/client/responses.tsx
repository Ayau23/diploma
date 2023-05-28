import { getMyResponses } from '@/API/response'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Client/Cards'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { ReactElement } from 'react'
import { useUserStore } from 'store/user'

const Main = () => {
  const { user } = useUserStore()
  const { data, isLoading, isError } = useQuery(
    ['my', 'responses', user?.id],
    getMyResponses,
  )

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>GoIntern | Profile</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
          {data.length ? (
            <Cards responses={data} />
          ) : (
            <span className='font-medium inline-block mt-8 ml-2'>
              No responses was found
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
