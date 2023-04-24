import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import clsx from 'clsx'
import { EditorState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, useState } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	vacancy: components['schemas']['Vacancy']
}
export const Info = ({ className, vacancy }: Props) => {
	const { t } = useTranslation()
	const formattedProgram = stateToHTML(
		EditorState.createWithContent(
			convertFromRaw(JSON.parse(vacancy.content)),
		).getCurrentContent(),
	)
	const [isBuy, setIsBuy] = useState(false)

	return (
		<>
			<div className={clsx(className)}>
				<h1 className='text-xl font-semibold mb-2 mt-8'>{vacancy.name}</h1>
				<p className='flex mb-3'>
					<span className='text-gray text-md '></span>
				</p>
				<div dangerouslySetInnerHTML={{ __html: formattedProgram }} />

				<Button
					className='mt-auto mb-6'
					onClick={() => {
						setIsBuy(true)
					}}
				>
					{t('Response')}
				</Button>
			</div>
		</>
	)
}
