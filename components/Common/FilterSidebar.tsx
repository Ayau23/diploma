import Checkbox from '@/components/UI/Checkbox'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useState } from 'react'
import { Button } from '../UI/Button'
import { useQuery } from '@tanstack/react-query'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const FilterSidebar = ({
  isVisible,
  onClose,
}: Props) => {
  const { t } = useTranslation()
  const {data, isLoading, isError} = useQuery(['categories'], () => getCategories())

  return (
    <div
      className={clsx(
        'fixed overflow-y-scroll scrollbar transition-all shadow-xl xs:w-[320px] xs:pb-[70px] duration-500 ease-out h-screen top-0 bg-white p-8 z-10 w-[400px]',
        isVisible ? 'right-0' : '-right-[400px] overflow-y-scroll',
      )}
    >
      <div className='flex flex-row justify-between mb-8'>
        <p className='text-xl font-semibold capitalize'>{t('categories')}</p>
        <button onClick={onClose} className=''>
          <Icon path={mdiClose} size={1} color='#3B3F32' />
        </button>
      </div>
      {([]:  ).map(category => (
        <Fragment key={category.id}>
          <label className='mb-4 flex items-center' key={category.id}>
            <Checkbox
              checked={category.checked}
              onChange={state => {
                setCategories(prevCategories => {
                  return prevCategories.map(prevCategory => {
                    if (prevCategory.id !== category.id) {
                      return prevCategory
                    }
                    return {
                      ...prevCategory,
                      checked: state,
                    }
                  })
                })
              }}
            />
            <span className='ml-3'>{t(category.name)}</span>
          </label>
        </Fragment>
      ))}
      <Button
        className='py-2'
        onClick={() => {
          setFilters(categories.filter(category => category.checked))
          onClose()
        }}
      >
        Применить
      </Button>
    </div>
  )
}
