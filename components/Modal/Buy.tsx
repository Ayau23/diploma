import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { Popover, Transition } from '@headlessui/react'
import { mdiChevronRight, mdiMinus, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'

interface Props {
	isVisible: boolean
	onClose: () => void
}
// TODO: Привести в порядок даты

export const Buy = ({ isVisible, onClose }: Props) => {
	const [adults, setAdults] = useState(1)
	const [children, setChildren] = useState(0)
	const { t } = useTranslation()

	return (
		<>
			<Tooltip
				anchorId='purchase'
				content='Покупка временно недоступна'
				place='top'
				className='z-30'
				noArrow
				delayShow={200}
			/>
			<Modal className='max-w-md p-6' isVisible={isVisible} onClose={onClose}>
				<p className='font-semibold text-xl text-center mb-5'>{t('billing')}</p>

				<Popover className='relative'>
					{({ open }) => {
						return (
							<>
								<Popover.Button className='flex justify-between items-center w-full '>
									<Icon
										path={mdiChevronRight}
										className={clsx(
											open && 'rotate-90 ',
											'transition-all duration-300 ease-out',
										)}
										size={1.3}
										color='#BFBFBF'
									/>
								</Popover.Button>
								<Transition
									as={Fragment}
									enter='transition ease-out duration-200'
									enterFrom='opacity-0 translate-y-1'
									enterTo='opacity-100 translate-y-0'
									leave='transition ease-in duration-150'
									leaveFrom='opacity-100 translate-y-0'
									leaveTo='opacity-0 translate-y-1'
								>
									<Popover.Panel className='absolute w-full bg-white rounded-lg p-6 shadow-lg'>
										<div className='flex justify-between items-center'>
											<p className='text-sm font-semibold'>
												{t('adults')}
												<span className='text-gray text-[10px] leading-normal block'>
													{t('from18yo')}
												</span>
											</p>
											<div className='flex gap-x-4'>
												<Button
													className='shrink-0 rounded-full w-6 h-6'
													disabled={adults === 1}
													onClick={() => setAdults(prevValue => --prevValue)}
												>
													<Icon path={mdiMinus} size={0.7} />
												</Button>
												{adults}
												<Button
													className='shrink-0 rounded-full w-6 h-6 '
													disabled={adults === 10}
													onClick={() => setAdults(prevValue => ++prevValue)}
												>
													<Icon path={mdiPlus} size={0.7} />
												</Button>
											</div>
										</div>
										<div className='flex justify-between items-center mt-4'>
											<p className='text-sm font-semibold'>
												{t('adults')}
												<span className='text-gray text-[10px] leading-normal block'>
													{t('from18yo')}
												</span>
											</p>
											<div className='flex gap-x-4'>
												<Button
													className='shrink-0 rounded-full w-6 h-6'
													disabled={children === 0}
													onClick={() => setChildren(prevValue => --prevValue)}
												>
													<Icon path={mdiMinus} size={0.7} />
												</Button>
												{children}
												<Button
													className='shrink-0 rounded-full w-6 h-6'
													disabled={children === 10}
													onClick={() => setChildren(prevValue => ++prevValue)}
												>
													<Icon path={mdiPlus} size={0.7} />
												</Button>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)
					}}
				</Popover>
				<p className='flex justify-between mt-5 mb-1'>
					<span className='font-semibold'>К оплате:</span>
					<span className='font-bold'>$ </span>
				</p>
				<span className='text-[10px] leading-normal text-lightDark inline-block'>
					{t('overall')}
				</span>
				<Button
					id='purchase'
					className='outline-none mt-6'
					onClick={() => {
						toast.error('Покупка временно недоступна')
					}}
				>
					Далее
				</Button>
				<span className='text-lightDark text-[10px] leading-tight inline-block mt-2.5'>
					{t('billingTag')}
				</span>
			</Modal>
		</>
	)
}
