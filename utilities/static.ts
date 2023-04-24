import {
	mdiAccount,
	mdiAccountKey,
	mdiAccountPlus,
	mdiBell,
	mdiBook,
	mdiHeart,
	mdiHome,
} from '@mdi/js'
import { Languages, Navbar } from 'utilities/interfaces'
import { Breadcrumb } from './interfaces'

export const clientTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
	{
		id: 3,
		href: '/client/responses',
		label: 'booking',
		icon: mdiBook,
	},
	{
		id: 4,
		href: '/notifications',
		label: 'notifications',
		icon: mdiBell,
	},
	{
		id: 5,
		href: '/client/profile',
		label: 'profile',
		icon: mdiAccount,
	},
]

export const companyTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/company/profile',
		label: 'profile',
		icon: mdiAccount,
	},
	{
		id: 3,
		href: '/notifications',
		label: 'notifications',
		icon: mdiBell,
	},
	{
		id: 4,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
]

export const noAuthTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
	{
		id: 3,
		href: '/auth/registration',
		label: 'signUp',
		icon: mdiAccountPlus,
	},
	{
		id: 4,
		href: '/auth/authorization',
		label: 'login',
		icon: mdiAccountKey,
	},
]

export const favouritesBreadcrumbs: Breadcrumb[] = [
	{
		id: 1,
		name: 'home',
		href: '/',
	},
	{
		id: 2,
		name: 'wishlist',
		href: '/',
	},
]

export const currencyList: Languages[] = [
	{
		id: 1,
		value: 'USD',
		name: 'American Dollar',
		symbol: '$',
	},
	{
		id: 2,
		value: 'EUR',
		name: 'Euro',
		symbol: '€',
	},
	{
		id: 3,
		value: 'AED',
		name: 'UAE Dirham',
		symbol: 'د.إ',
	},
	{
		id: 4,
		value: 'THB',
		name: 'Thai Baht',
		symbol: '฿',
	},
	{
		id: 5,
		value: 'TRY',
		name: 'Turkish Lira',
		symbol: '₺',
	},
	{
		id: 6,
		value: 'GBP',
		name: 'Great British Pound',
		symbol: '£',
	},
]

export const langList = [
	{
		id: 1,
		name: 'english',
		value: 'en',
	},
	{
		id: 2,
		name: 'russian',
		value: 'ru-RU',
	},
	{
		id: 3,
		name: 'german',
		value: 'de-DE',
	},
	{
		id: 4,
		name: 'thai',
		value: 'th-TH',
	},
	{
		id: 5,
		name: 'turkish',
		value: 'tr-TR',
	},
	{
		id: 6,
		name: 'french',
		value: 'fr-FR',
	},
	{
		id: 7,
		name: 'arabian',
		value: 'ar-AE',
	},
	{
		id: 8,
		name: 'spanish',
		value: 'es-ES',
	},
	{
		id: 9,
		name: 'italian',
		value: 'it-IT',
	},
]
