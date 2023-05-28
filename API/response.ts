import { $authHost } from '.'
import { components } from './types/api.types'

export const getMyResponses = async (): Promise<
  components['schemas']['Response'][]
> => {
  return await (
    await $authHost.get('/api/myResponse/list/')
  ).data
}

export const createResponse = async (
  request: components['schemas']['ResponseAddRequest'] & { id: number },
): Promise<components['schemas']['Response']> => {
  return await (
    await $authHost.post(`/api/responseAdd/${request.id}/`, request)
  ).data
}

export const getResponses = async (
  id?: number | string,
): Promise<components['schemas']['Response'][]> => {
  return await (
    await $authHost.get(`/api/responseByVacancy/${id}/`)
  ).data
}

export const editResponse = async (
  request: components['schemas']['PatchedResponsePostRequest'] & { id: number },
): Promise<components['schemas']['ResponsePost']> => {
  return await (
    await $authHost.patch(`/api/responseByIdUpdate/${request.id}/`, request)
  ).data
}
