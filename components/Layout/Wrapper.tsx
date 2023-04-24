// import { Footer } from '@/components/Layout/Footer'
import { Container } from '@/components/UI/Container'
import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface Props {
	children: ReactNode
}

export const Wrapper = ({ children }: Props) => {
	return (
		<div className='flex'>
			<Sidebar className='basis-64 shrink-0'></Sidebar>
			<div className=' mx-auto w-full'>
				{children}
				<Container>{/* <Footer /> */}</Container>
			</div>
		</div>
	)
}
