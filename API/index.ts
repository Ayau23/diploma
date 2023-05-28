import axios from 'axios'

const URL = 'http://167.99.140.74/'
const $host = axios.create({
  baseURL: URL,
})

const $authHost = axios.create({
  baseURL: URL,
})

const authInterceptor = async (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
}
$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await $host.post(
          'api/token/refresh/',
          {
            refresh: localStorage.getItem('refreshToken'),
          },
          {
            withCredentials: true,
          },
        )
        localStorage.setItem('accessToken', response.data.access)
        return $authHost.request(originalRequest)
      } catch (e) {
        // Router.push('/')
        // useUserStore.setState({
        // user: undefined,
        // })
      }
    } else {
      throw error
    }
  },
)

export { $host, $authHost }
