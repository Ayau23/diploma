import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'

const Main = () => {
	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<Container className='flex flex-row pt-10 pb-24'>
				<div className='w-full h-full'>
					<span className='relative h-40 w-full inline-block my-8'>
						<Image fill src='/images/demo.png' alt={''}></Image>
					</span>
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
