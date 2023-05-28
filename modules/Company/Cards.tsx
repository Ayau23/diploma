import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/Vacancy/Company/Card'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import Link from 'next/link'

interface Props {
  title?: string | null
  vacancies: components['schemas']['Vacancy'][]
}

export const Cards = ({ vacancies, title }: Props) => {
  return (
    <div>
      {title && (
        <p className='font-semibold text-lg mb-4 mt-8 flex flex-row gap-x-2'>
          {title}
          <Link id='addTour' href={'/company/vacancy/add/'}>
            <Button className='rounded-full w-6 h-6'>
              <Icon path={mdiPlus} size={0.8} />
            </Button>
          </Link>
        </p>
      )}
      <div className='flex flex-row flex-wrap gap-y-5 gap-x-4 xs:justify-center'>
        {vacancies?.map(vacancy => (
          <Card className='' key={vacancy.id} vacancy={vacancy}></Card>
        ))}
      </div>
    </div>
  )
}
