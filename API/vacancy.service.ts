import { $host } from '.'
import { components } from './types/api.types'

export const getVacancies = async (): Promise<
	components['schemas']['Vacancy'][]
> => {
	return await (
		await $host.get('/api/vacancy/list/')
	).data
}

export const getVacancy = async ({
	id,
}: {
	id: number | string | undefined
}): Promise<components['schemas']['Vacancy']> => {
	return await (
		await $host.get(`/api/vacancy/${id}`)
	).data
}
