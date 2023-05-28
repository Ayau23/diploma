import { DehydratedState } from '@tanstack/react-query'
import { Navbar, User } from './interfaces'
import { clientTopNavbar, companyTopNavbar, noAuthTopNavbar } from './static'

export const json = (data: DehydratedState) => JSON.parse(JSON.stringify(data))

export const getNavbarList = (user?: User | null): Navbar[] => {
  if (user && user.pick === 'company') {
    return companyTopNavbar
  } else if (user && user.pick === 'client') {
    return clientTopNavbar
  } else {
    return noAuthTopNavbar
  }
}

export const getCategoriesList = (categories: string[]) => {
  return categories.join('=true&')
}

export const generateUUID = () => {
  let d = new Date().getTime() //Timestamp
  let d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 //random number between 0 and 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const isJSON = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
