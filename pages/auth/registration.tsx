import { authorizeClient, registerClient } from '@/API/client.service'
import { authorizeCompany, registerCompany } from '@/API/company.service'
import { components } from '@/API/types/api.types'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiEmail, mdiLock } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import 'firebase/auth'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'store/user'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'

const Main = () => {
	const { push } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<
		components['schemas']['ClientCreateRequest'] &
			components['schemas']['CompanyCreateRequest']
	>()
	const { t } = useTranslation()
	const { addUser } = useUserStore()
	const { mutate: _registerClient } = useMutation(registerClient)
	const { mutate: _registerCompany } = useMutation(registerCompany)
	const { mutate: _authorizeClient } = useMutation(authorizeClient)
	const { mutate: _authorizeCompany } = useMutation(authorizeCompany)

	const [isEmployee, setIsEmployee] = useState(true)
	const [isNotify, setIsNotify] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const swiperRef = useRef<SwiperCore>()

	const onInit = (Swiper: SwiperCore): void => {
		swiperRef.current = Swiper
	}

	const onSubmit = (
		data: components['schemas']['ClientCreateRequest'] &
			components['schemas']['CompanyCreateRequest'],
	) => {
		setIsLoading(true)
		if (isEmployee) {
			_registerClient(
				{
					first_name: data.first_name,
					last_name: data.last_name,
					password: data.password,
					email: data.email,
					phone: data.phone,
				},
				{
					onSuccess: registered => {
						_authorizeClient(
							{
								email: data.email,
								password: data.password,
							},
							{
								onSuccess: authorized => {
									localStorage.setItem('accessToken', registered.access_token)
									addUser({
										pick: 'client',
										id: authorized.id,
										email: data.email,
										client: {
											firstName: data.first_name ?? '',
											lastName: data.last_name ?? '',
										},
									})
									push('/client/profile')
								},
							},
						)
					},
				},
			)
		} else {
			_registerCompany(
				{
					company_description: data.company_description,
					company_name: data.company_name,
					password: data.password,
					email: data.email,
				},
				{
					onSuccess: registered => {
						_authorizeCompany(
							{
								email: data.email,
								password: data.password,
							},
							{
								onSuccess: authorized => {
									localStorage.setItem('accessToken', registered.access_token)
									addUser({
										pick: 'company',
										id: authorized.id,
										email: data.email,
										company: {
											name: data.company_name,
											description: data.company_description,
										},
									})
									push('/company/profile')
								},
							},
						)
					},
				},
			)
		}
	}

	return (
		<>
			<Head>
				<title>Registration | GoIntern</title>
			</Head>
			<Wrapper>
				<Container className='flex flex-row items-center justify-center py-10 lg:block mx-auto'>
					<div className='basis-4/12 lg:basis-full lg:max-w-xl mx-auto'>
						<h1 className='font-semibold text-xl text-center mb-7'>
							Registration
						</h1>
						<div>
							<p className='text-center mb-4'>{t('Choose account type')}</p>
							<div className='flex text-sm gap-x-4 justify-center font-semibold text-center'>
								<span
									className={clsx(
										'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer basis-full',
										isEmployee ? 'border-[#86A545]' : 'border-[#BFBFBF]',
									)}
									onClick={() => setIsEmployee(true)}
								>
									<span
										className={clsx(
											'text-center block',
											isEmployee ? 'text-[#86A545]' : 'text-[#BFBFBF]',
										)}
									>
										{t('Employee')}
									</span>
								</span>

								<span
									className={clsx(
										'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer basis-full',
										!isEmployee ? 'border-[#86A545]' : 'border-[#BFBFBF]',
									)}
									onClick={() => setIsEmployee(false)}
								>
									<span
										className={clsx(
											'text-center block',
											!isEmployee ? 'text-[#86A545]' : 'text-[#BFBFBF]',
										)}
									>
										{t('Company')}
									</span>
								</span>
							</div>
						</div>
						<div className='flex flex-row justify-center items-center my-4 flex-nowrap'>
							<span className='bg-[#D9D9D9] h-[1px] basis-full' />
						</div>

						<form
							className='flex flex-col mt-3'
							onSubmit={handleSubmit(onSubmit)}
						>
							<Input
								{...register('email', {
									required: 'Заполните поле',
									pattern: {
										value:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Неверный формат email',
									},
								})}
								className='mb-5'
								error={errors.email?.message}
								placeholder='Введите e-mail'
								label='E-mail'
								icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
							/>
							{isEmployee ? (
								<>
									<Input
										{...register('phone', {
											required: 'Заполните поле',
										})}
										className='mb-5'
										error={errors.phone?.message}
										placeholder='Enter phone number'
										label='Phone'
										icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
									/>
									<Input
										{...register('first_name', {
											required: 'Заполните поле',
										})}
										className='mb-5'
										error={errors.first_name?.message}
										placeholder='Enter first name'
										label='First name'
										icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
									/>
									<Input
										{...register('last_name', {
											required: 'Заполните поле',
										})}
										className='mb-5'
										error={errors.last_name?.message}
										placeholder='Enter last name'
										label='Last name'
										icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
									/>
								</>
							) : (
								<>
									<Input
										{...register('company_name', {
											required: 'Заполните поле',
										})}
										className='mb-5'
										error={errors.company_name?.message}
										placeholder='Enter company name'
										label='Name'
										icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
									/>
									<Input
										{...register('company_description', {
											required: 'Заполните поле',
										})}
										className='mb-5'
										error={errors.company_description?.message}
										placeholder='Company description'
										label='Description'
										icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
									/>
								</>
							)}
							<Input
								{...register('password', {
									required: 'Заполните поле',
									validate: value => {
										if (value.length < 8) {
											return 'Пароль должен быть не менее 8 символов'
										}
										if (value === value.toLowerCase()) {
											return 'Пароль должен содержать заглавную букву'
										}
										if (value === value.toUpperCase()) {
											return 'Пароль должен содержать строчную букву'
										}
										if (!/\d/.test(value)) {
											return 'Пароль должен содержать одну цифру'
										}
									},
								})}
								error={errors.password?.message}
								type='password'
								placeholder='Введите пароль'
								label={`${t('Password')}`}
								icon={<Icon color='#BFBFBF' path={mdiLock} size={1} />}
							/>
							<div className='flex gap-x-3 mt-7 '>
								<Checkbox
									checked={isNotify}
									onChange={state => setIsNotify(state)}
								/>
								<div onClick={() => setIsNotify(prevState => !prevState)}>
									<p className='font-semibold text-lightDark'>
										{t('receiveTips')}
									</p>
									<span className='text-[10px] leading-[13px] inline-block mt-2'>
										{t('weSendText')}
										<Link href='/' className='font-semibold'>
											<br /> {t('privacyPolicy')}
										</Link>
									</span>
								</div>
							</div>
							<Button
								// disabled={isLoading}
								// isLoading={isLoading}
								className='mt-7'
							>
								{t('signUp')}
							</Button>
							<span className='text-[10px] text-center block mt-2'>
								{t('byProceedingYouConfirm')}{' '}
								<Link href='/' className='font-semibold'>
									{t('termsOfUse')}
								</Link>
							</span>
							<p className='font-semibold text-lightDark text-sm mt-7 self-center inline-block'>
								{t('alreadyHaveAccount')}?{' '}
								<Link href='/auth/authorization' className='text-green'>
									{t('logIn')}
								</Link>
							</p>
						</form>
					</div>
					<div className='basis-6/12 lg:hidden overflow-hidden h-[calc(100vh_-_100px)] bg-[#FBFBFB] rounded-2xl flex items-center'>
						<Swiper
							onInit={onInit}
							centeredSlides={true}
							mousewheel={{ forceToAxis: false, invert: true }}
							autoplay={{
								delay: 2000,
								disableOnInteraction: true,
							}}
							modules={[Pagination, Autoplay]}
							pagination={{
								dynamicBullets: true,
							}}
							spaceBetween={10}
							slidesPerView={1}
							className='rounded-t-xl w-full'
						>
							<SwiperSlide className='mb-10'>
								<Image
									className='transition-all duration-300 ease-in-out w-full h-60'
									alt='Slides'
									src='/images/slide_1.svg'
									width={300}
									height={225}
								/>
							</SwiperSlide>
							<SwiperSlide className='mb-10'>
								<Image
									className='transition-all duration-300 ease-in-out w-full h-60'
									alt='Slides'
									src='/images/slide_2.svg'
									width={300}
									height={225}
								/>
							</SwiperSlide>
							<SwiperSlide className='mb-10'>
								<Image
									className='transition-all duration-300 ease-in-out w-full h-60'
									alt='Slides'
									src='/images/slide_3.svg'
									width={300}
									height={225}
								/>
							</SwiperSlide>
						</Swiper>
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
