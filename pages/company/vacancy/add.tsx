import { createVacancy } from '@/API/vacancy'
import NoSSR from '@/components/Common/NoSSR'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { VacancyFields } from '@/utilities/interfaces'
import { useMutation } from '@tanstack/react-query'
import { EditorState, convertToRaw } from 'draft-js'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useUserStore } from 'store/user'

const Editor = dynamic(
	() => import('react-draft-wysiwyg').then(mod => mod.Editor),
	{ ssr: false },
)

const Main = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<VacancyFields>()
	const { t } = useTranslation()
	const { user } = useUserStore()
	const { push } = useRouter()
	const { mutate } = useMutation(createVacancy)

	const [editor, setEditor] = useState(EditorState.createEmpty())

	const onSubmit = (data: VacancyFields) => {
		mutate(
			{
				name: data.title,
				content: JSON.stringify(convertToRaw(editor.getCurrentContent())),
				company: user?.id,
				salary_min: data.minSalary,
				salary_max: data.maxSalary,
			},
			{
				onSuccess: result => {
					push(`/vacancy/${result.id}`)
				},
				onError: () => {
					toast.error('Error while creating vacancy')
				},
			},
		)
	}

	return (
		<>
			<Head>
				<title>{`${t('Add vacancy')} | GoIntern`}</title>
			</Head>
			<NoSSR>
				<Tooltip
					noArrow
					delayShow={200}
					content='Сохранить на время'
					place='bottom'
				/>
				<Wrapper>
					<Container className='justify-self-center pt-10 flex flex-col mx-auto min-h-screen'>
						<h1 className='font-semibold text-lg'>Add vacancy</h1>
						<div className='my-5 w-6/12 mx-auto'>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Input
									label={t('Title')}
									placeholder='We need Frontend developer'
									{...register('title', { required: true })}
									error={errors.title?.message}
								/>
								<div className='flex flex-row w-full justify-between mt-2'>
									<Input
										{...register('minSalary', { required: true })}
										label='Min. Salary'
										placeholder='1000 ₸'
										className='basis-[calc(50%_-_16px)]'
									/>
									<Input
										{...register('maxSalary', { required: true })}
										label='Max. Salary'
										placeholder='2000 ₸'
										className='basis-[calc(50%_-_16px)]'
									/>
								</div>
								<div className='w-full mt-2'>
									<span className='font-semibold text-sm inline-block'>
										Content
									</span>
									<NoSSR>
										<Editor
											wrapperClassName='border-lightGray border-2 rounded-lg p-2'
											toolbar={{
												options: [
													'inline',
													'blockType',
													'fontSize',
													'list',
													'textAlign',
													'link',
													'embedded',
													'emoji',
													'image',
													'remove',
													'history',
												],
											}}
											onEditorStateChange={state => setEditor(state)}
										/>
									</NoSSR>
								</div>
								<Button className='mt-2'>Create</Button>
							</form>
						</div>
					</Container>
				</Wrapper>
			</NoSSR>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
