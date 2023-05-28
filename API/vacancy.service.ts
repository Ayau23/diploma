import { $authHost, $host } from '.'
import { components } from './types/api.types'

export const createVacancy = async (
  request: components['schemas']['VacancyCreateRequest'],
): Promise<components['schemas']['VacancyCreate']> => {
  return await (
    await $authHost.post('/api/vacancy/', request)
  ).data
}

export const editVacancy = async (
  request: components['schemas']['PatchedVacancyCreateRequest'] & {
    id: number
  },
): Promise<components['schemas']['VacancyCreate']> => {
  return await (
    await $authHost.patch(`/api/vacancy/${request.id}/`, request)
  ).data
}

export const deleteVacancy = async (id: number) => {
  return await (
    await $authHost.delete(`/api/vacancy/${id}/`)
  ).data
}

export const getVacancies = async (): Promise<
  components['schemas']['Vacancy'][]
> => {
  return await (
    await $host.get('/api/allVacancy/')
  ).data
}

export const searchVacancies = async (
  search: string,
): Promise<components['schemas']['Vacancy'][]> => {
  return await (
    await $host.get('/api/vacancySearch/?search=' + search)
  ).data
}

export const getFavourites = async (
  favourites: number[],
): Promise<components['schemas']['Vacancy'][]> => {
  return await (
    await $host.get(`/api/vacancyIDs/?id_in=${favourites.join('&id_in=')}`)
  ).data
}

export const getVacancy = async ({
  id,
}: {
  id: number | string | undefined
}): Promise<components['schemas']['Vacancy']> => {
  return await (
    await $host.get(`/api/vacancyByID/${id}`)
  ).data
}

export const getMyVacancies = async (): Promise<
  components['schemas']['Vacancy'][]
> => {
  return await (
    await $authHost.get('/api/vacancy/')
  ).data
}
