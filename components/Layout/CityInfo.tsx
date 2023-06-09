import { components } from '@/API/types/api.types'
import {
	mdiCalendarBlank,
	mdiMapMarker,
	mdiMenu,
	mdiWhiteBalanceSunny,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useState } from 'react'

interface Props {
	city: components['schemas']['City']
}

export const CityInfo = ({ city }: Props) => {
	const [isCategories, setIsCategories] = useState(false)
	return (
		<>
			<div className='flex justify-between'>
				<div>
					<p className='flex '>
						<Icon size={1} color='#86A545' path={mdiMapMarker} />
						<span className='text-gray text-md '></span>
					</p>
				</div>
				<div className='flex items-center'>
					{
						<Icon
							path={mdiWhiteBalanceSunny}
							className='mr-2'
							size={1}
							color='#FFCE1F'
						/>
					}{' '}
					<span className='font-semibold text-xl'></span>
				</div>
			</div>
			<div className='flex justify-between mt-8'>
				<button
					onClick={() => setIsCategories(prevState => !prevState)}
					className='relative flex items-center border-gray border bg-white rounded-lg px-4 py-2 text-sm font-semibold basis-auto shrink-0'
				>
					<Icon path={mdiMenu} size={1} color='#86A545' className='mr-1' />
					Категории
				</button>
				<div className='flex items-center gap-3'>
					<button className='rounded-full py-3 px-4 border border-lightGray text-sm font-semibold'>
						Сегодня
					</button>
					<button className='rounded-full py-3 px-4 border border-lightGray text-sm font-semibold'>
						Завтра
					</button>
					<button className='rounded-full py-2 h-[46px] px-8 border border-lightGray text-sm font-semibold'>
						<Icon path={mdiCalendarBlank} size={1} />{' '}
					</button>
				</div>
			</div>
		</>
	)
}
