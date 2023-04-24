import { $authHost } from '.'
import { components } from './types/api.types'

export const createVacancy = async (
	request: components['schemas']['VacancyCreateRequest'],
): Promise<components['schemas']['VacancyCreate']> => {
	return await (
		await $authHost.post('/api/vacancy/create/', request)
	).data
}
