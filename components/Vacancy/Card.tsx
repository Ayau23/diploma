import { components } from '@/API/types/api.types'
import { mdiCardsHeart } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { useFavouritesStore } from 'store/favourites'
import NoSSR from '../Common/NoSSR'

interface Props extends ComponentPropsWithoutRef<'div'> {
  vacancy: components['schemas']['Vacancy']
}

export const Card = ({ vacancy, className }: Props) => {
  const { favourites, addFavourite, removeFavourite } = useFavouritesStore()

  const isFavourite = favourites.find(_vacancy => _vacancy === vacancy.id)

  const addToFavourites = () => {
    isFavourite ? removeFavourite(vacancy.id) : addFavourite(vacancy.id)
  }

  return (
    <div
      className={clsx(
        ' border-lightGray border rounded-lg relative basis-[calc(50%_-_16px)] flex flex-col xs:max-w-none lg:basis-52 xs:basis-10/12 xs:mb-5',
        className,
      )}
    >
      <NoSSR>
        <button
          onClick={addToFavourites}
          className='top-3 absolute right-3 rounded-full bg-white p-[4px]'
        >
          <Icon
            path={mdiCardsHeart}
            size={0.7}
            color={isFavourite ? '#EB455F' : '#BFBFBF'}
            className='relative translate-y-[0.5px] '
          />
        </button>
      </NoSSR>
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
