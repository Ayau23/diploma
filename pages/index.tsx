import { getVacancies } from '@/API/vacancy.service'
import NoSSR from '@/components/Common/NoSSR'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Alert } from '@/components/Modal/Alert'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Search } from '@/modules/Search'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

const Main = () => {
	const { t } = useTranslation()
	const { locale } = useRouter()

	const {
		data: vacancies,
		isLoading,
		isError,
	} = useQuery(['vacancies'], () => getVacancies())

	const [isAlert, setIsAlert] = useState(Math.random() < 0.9)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<Head>
				<title>GoIntern</title>
			</Head>
			<NoSSR>
				<Alert isVisible={isAlert} onClose={() => setIsAlert(false)} />
			</NoSSR>
			<Wrapper>
				<Container className='pt-10 pb-24 mx-auto xs:pt-0'>
					<Search />
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
