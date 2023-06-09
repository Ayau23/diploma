import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { usePreserveScroll } from 'hooks/usePreserveScroll'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import '../styles/globals.css'

import { appWithTranslation } from 'next-i18next'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
	const [queryClient] = useState(() => new QueryClient())
	const getLayout = Component.getLayout ?? (page => page)
	usePreserveScroll()
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				{getLayout(<Component {...pageProps} />)}
			</Hydrate>
		</QueryClientProvider>
	)
}

export default appWithTranslation(App)
