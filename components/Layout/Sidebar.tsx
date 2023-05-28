import { getNavbarList } from '@/utilities/utilities'
import { mdiLogout } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef } from 'react'
import { useUserStore } from 'store/user'
import NoSSR from '../Common/NoSSR'

export const Sidebar = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) => {
  const { user, removeUser } = useUserStore()
  const { t } = useTranslation()
  const { locale, pathname, push, asPath } = useRouter()

  return (
    <NoSSR>
      <div
        className={clsx(
          className,
          '2xl:hidden border-r border-[#E9EAE8] px-6 pt-10',
        )}
        {...rest}
      >
        <Link href='/' className=''>
          <span className='relative flex justify-center text-xl'>GoIntern</span>
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
      </div>
    </NoSSR>
  )
}
