export interface Categories {
	id: number
	value: string
}

export interface Breadcrumb {
	id: number
	name?: string
	href?: string
}

export interface QueryParams {
	id?: string | number
}

export interface AdditionalInfo {
	id: string
	title: string
	description: string
}

export interface AuthorizationFields {
	email: string
	password: string
}

export type ArrayElement<
	ArrayType extends readonly unknown[] | undefined | null,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export interface ListItem {
	id: number
	icon?: string
	value: string
	name?: string
}

export interface Navbar {
	id: number
	href: string
	label: string
	icon: string
}

export interface ProfileFields {
	fullName: string
	email: string
	phone: string
	socialLink: string
}

export interface Languages {
	id: number
	name: string
	value: string
	symbol: string
}

export interface User {
	id: number
	email: string
	phone?: string
	pick: 'company' | 'client'
	client?: {
		firstName: string
		lastName: string
	}
	company?: {
		name: string
		description: string
	}
}

export interface VacancyFields {
	title: string
	content: string
	minSalary: number
	maxSalary: number
}
