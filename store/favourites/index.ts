import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Favourites {
  favourites: number[]
  addFavourite: (id: number) => void
  removeFavourite: (id: number) => void
}

export const useFavouritesStore = create<Favourites>()(
  devtools(
    persist(
      set => ({
        favourites: [],
        addFavourite: id =>
          set(state => ({ favourites: [...state.favourites, id] })),
        removeFavourite: id =>
          set(state => ({
            favourites: state.favourites.filter(favorite => favorite !== id),
          })),
      }),
      {
        name: 'favourites',
      },
    ),
  ),
)
