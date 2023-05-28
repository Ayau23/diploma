import { getResponses } from '@/API/response'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Responses } from '@/modules/Company/Responses'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Main = () => {
  const { query } = useRouter()

  const { data, isLoading, isError } = useQuery(
    ['responses', Number(query.id)],
    () => getResponses(query.id as string),
  )

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return (
    <>
      <Head>
        <title>GoIntern | Responses</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
          {data.length ? (
            <Responses responses={data} />
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
