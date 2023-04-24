import { components } from '@/API/types/api.types'
import { Card } from '@/components/Vacancy/Card'

interface Props {
	title?: string | null
	vacancies: components['schemas']['Vacancy'][]
}

export const Cards = ({ vacancies, title }: Props) => {
	return (
		<div>
			{title && <p className='font-semibold text-lg mb-4 mt-8'>{title}</p>}
			<div className='flex flex-row flex-wrap gap-y-5 gap-x-4 xs:justify-center'>
				{vacancies?.map(vacancy => (
					<Card className='' key={vacancy.id} vacancy={vacancy}></Card>
				))}
			</div>
		</div>
	)
}
