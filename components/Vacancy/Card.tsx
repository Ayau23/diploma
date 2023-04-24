import { components } from '@/API/types/api.types'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { useFavouritesStore } from 'store/favourites'
import { usePreferencesStore } from 'store/preferences'

interface Props extends ComponentPropsWithoutRef<'div'> {
	vacancy: components['schemas']['Vacancy']
}

export const Card = ({ vacancy, className }: Props) => {
	const { currency } = usePreferencesStore(state => state)
	const { favourites, addFavourite, removeFavourite } = useFavouritesStore(
		state => state,
	)
	// const isTourInFavourite = favourites.find(favourite => favourite === vacancy.id)
	// const addToFavourites = () => {
	// isTourInFavourite ? removeFavourite(vacancy.id) : addFavourite(vacancy.id)
	// }

	// TODO: Настроить отображение рейтинга

	return (
		<div
			className={clsx(
				' border-lightGray border rounded-lg relative basis-[calc(50%_-_16px)] flex flex-col xs:max-w-none lg:basis-52 xs:basis-10/12 xs:mb-5',
				className,
			)}
		>
			{/* <span className='top-3 absolute left-3 rounded-lg bg-yellow py-1 px-3 font-bold'> */}
			{/* <NoSSR>
					{vacancy.price && data?.price
						? `${currency.symbol} ${data.price * vacancy.price ?? 0}`
						: `${currency.symbol} ${vacancy.price}`}
				</NoSSR> */}
			{/* </span> */}
			<div className='w-full px-3 py-3 rounded-lg border-t-0'>
				<Link href={`/vacancy/${vacancy.id}`}>
					<p className='font-semibold text-sm mb-1'>{vacancy.name}</p>
				</Link>
				<span className='text-gray font-normal mb-2 inline-block'>
					{vacancy.salary_min} тг. - {vacancy.salary_max} тг.
				</span>
				<div className='flex flex-row items-center'></div>
			</div>
		</div>
	)
}
