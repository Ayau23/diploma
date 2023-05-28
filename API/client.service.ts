import { $authHost, $host } from '.'
import { components } from './types/api.types'

export const authorizeClient = async (
  request: components['schemas']['ClientLoginRequest'],
): Promise<components['schemas']['ClientLogin']> => {
  const { data } = await $host.post('/api/client/login/', request)
  return data
}

export const registerClient = async (
  request: components['schemas']['ClientCreateRequest'],
): Promise<components['schemas']['ClientCreate']> => {
  const { data } = await $host.post('/api/client/register/', request)
  return data
}

export const getMe = async (): Promise<components['schemas']['Client']> => {
  const { data } = await $authHost.get('/api/clients/me/')
  return data
}
