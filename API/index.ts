import axios from 'axios'
// import Router from 'next/router'

const URL = process.env.NEXT_PUBLIC_API_URL

const $host = axios.create({
	baseURL: URL,
})

const $authHost = axios.create({
	baseURL: URL,
	withCredentials: true,
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
				const response = await $host.post('api/auth/token/refresh/', {
					withCredentials: true,
				})
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
