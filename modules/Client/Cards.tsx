import { components } from '@/API/types/api.types'
import { Card } from '@/components/Vacancy/Client/Card'

interface Props {
  responses: components['schemas']['Response'][]
}

export const Cards = ({ responses }: Props) => {
  return (
    <div>
      <div className='flex flex-row flex-wrap gap-y-5 gap-x-4 xs:justify-center'>
        {responses?.map(response => (
          <Card className='' key={response.id} response={response}></Card>
        ))}
      </div>
    </div>
  )
}
