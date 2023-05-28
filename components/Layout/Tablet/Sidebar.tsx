import NoSSR from '@/components/Common/NoSSR'
import { getNavbarList } from '@/utilities/utilities'
import { mdiLogout } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePreferencesStore } from 'store/preferences'
import { useUserStore } from 'store/user'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const Sidebar = ({ isVisible, onClose }: Props) => {
  const { currency, editPreferences } = usePreferencesStore()
  const { user, removeUser } = useUserStore()
  const { t } = useTranslation()
  const { locale, pathname, push, asPath } = useRouter()

  return (
    <div
      className={clsx(
        'fixed overflow-y-scroll scrollbar transition-all shadow-xl xs:w-[320px] xs:pb-[70px] duration-500 ease-out h-screen  top-0 bg-white p-8 pr-0 z-20 w-[300px]',
        isVisible ? 'left-0' : '-left-[400px] overflow-y-scroll',
      )}
    >
      <NoSSR>
        <Link href='/' className=''>
          <span className='relative flex justify-center'>GoIntern</span>
        </Link>
        <div className='mt-10'>
          {getNavbarList(user).map(link => (
            <Link
              key={link.id}
              href={link.href}
              className={clsx(
                'flex flex-row items-center gap-x-3 group rounded-lg hover:bg-[#F6F6F5] px-7 py-2 transition-all duration-300 ease-out capitalize w-full',
              )}
            >
              <Icon
                className={clsx(
                  pathname === link.href ? 'text-green' : 'text-gray',
                )}
                path={link.icon}
                size={1}
              />
              <span
                className={clsx(
                  pathname === link.href
                    ? 'text-green font-semibold'
                    : 'text-lightDark',
                )}
              >
                {t(link.label)}
              </span>
            </Link>
          ))}
          <div className='mt-60'>
            {user && (
              <button
                className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out w-full mt-12'
                onClick={() => {
                  removeUser()
                  localStorage.removeItem('accessToken')
                  localStorage.removeItem('refreshToken')
                  push('/')
                }}
              >
                <Icon className={clsx('text-gray')} path={mdiLogout} size={1} />
                Log out
              </button>
            )}
          </div>
        </div>
      </NoSSR>
    </div>
  )
}
