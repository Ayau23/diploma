import { User } from '@/utilities/interfaces'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UserStore {
	user?: User
	addUser: (user: User) => void
	removeUser: () => void
	editUser: (user: User) => void
}

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			set => ({
				user: undefined,
				addUser: user =>
					set(() => ({
						user,
					})),
				removeUser: () =>
					set(() => ({
						user: undefined,
					})),
				editUser: user =>
					set(() => ({
						user,
					})),
			}),
			{
				name: 'user',
			},
		),
	),
)
