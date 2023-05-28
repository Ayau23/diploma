import { $authHost, $host } from '.'
import { components } from './types/api.types'

export const authorizeCompany = async (
  request: components['schemas']['CompanyLoginRequest'],
): Promise<components['schemas']['CompanyLogin']> => {
  const { data } = await $host.post('/api/company/login/', request)
  return data
}

export const registerCompany = async (
  request: components['schemas']['CompanyCreateRequest'],
): Promise<components['schemas']['CompanyCreate']> => {
  const { data } = await $host.post('/api/company/register/', request)
  return data
}

export const getMe = async (): Promise<components['schemas']['Company']> => {
  const { data } = await $authHost.get('/api/companies/me/')
  return data
}
