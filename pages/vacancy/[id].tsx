import { getVacancy } from '@/API/vacancy.service'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { Info } from '@/modules/Tour/Info'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement } from 'react'

const Main = () => {
	const { locale, query } = useRouter()
	const {
		data: vacancy,
		isLoading,
		isError,
	} = useQuery(['vacancy', query.id], () =>
		getVacancy({
			id: query.id as string,
		}),
	)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<Head>
				<title>{vacancy.name} | GoIntern</title>
				{/* <meta name='description' content={vacancy.description} /> */}
			</Head>
			<Wrapper>
				<Container className='pt-10 pb-24 mx-auto xs:pt-5'>
					<div className='flex gap-x-5 lg:flex-col'>
						<Info vacancy={vacancy} className='basis-1/2 flex flex-col' />
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
