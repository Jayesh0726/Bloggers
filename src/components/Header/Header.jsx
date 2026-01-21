import React, { useMemo, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

function Header() {
  const isAuthentication = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const displayName = useMemo(() => {
    if (!userData) return ''
    if (userData.name) return userData.name
    const first = userData.prefs?.Firstname || ''
    const last = userData.prefs?.Lastname || ''
    return `${first} ${last}`.trim()
  }, [userData])

  const initials = useMemo(() => {
    if (!displayName) return 'U'
    const parts = displayName.trim().split(/\s+/).filter(Boolean)
    if (!parts.length) return 'U'
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('')
  }, [displayName])

  const navigateItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthentication,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isAuthentication,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isAuthentication,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isAuthentication,
    },
  ]

  const handleNavigation = (slug) => {
    navigate(slug)
    setMobileMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          <Link to='/' className='flex-shrink-0'>
            <Logo width='54px' />
          </Link>

          <ul className='hidden md:flex items-center gap-2'>
            {navigateItems.map((item) =>
              item.active ? (
                <li key={item.name} className='cursor-pointer'>
                  <Button
                    onClick={() => handleNavigation(item.slug)}
                    variant={location.pathname === item.slug ? 'default' : 'ghost'}
                    size='sm'
                    className={location.pathname === item.slug ? 'pointer-events-none' : ''}
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
          </ul>

          <div className='flex items-center gap-2 ml-auto md:ml-4'>
            {isAuthentication ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className='group flex items-center cursor-pointer gap-2 rounded-full border px-2 py-1 transition hover:shadow-sm'
                    aria-label='Open profile menu'
                  >
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary-700 dark:text-primary-300'>
                      {initials}
                    </div>
                    <svg
                      className='h-4 w-4 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent align='end' className='w-72 px-1 py-2'>
                  <div className='flex items-start gap-3 border-b px-4 py-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary-700 dark:text-primary-300'>
                      {initials}
                    </div>
                    <div className='min-w-0'>
                      <p className='font-semibold leading-tight truncate'>{displayName || 'User'}</p>
                      <p className='text-xs text-muted-foreground truncate'>{userData?.email}</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-1 p-2'>
                    <Button
                      variant='ghost'
                      className='justify-start cursor-pointer'
                      onClick={() => navigate('/profile')}
                    >
                      Updates
                    </Button>
                    <Button
                      variant='ghost'
                      className='justify-start cursor-pointer'
                      onClick={toggleTheme}
                    >
                      Theme: {isDark ? 'Dark' : 'Light'}
                    </Button>
                    <div className='pt-3 cursor-pointer border-t'>
                      <LogoutBtn />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                onClick={toggleTheme}
                variant='ghost'
                size='icon'
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
                  </svg>
                ) : (
                  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 3.536l.707-.707a1 1 0 011.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z' clipRule='evenodd'></path>
                  </svg>
                )}
              </Button>
            )}

            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant='ghost'
              size='icon'
              className='md:hidden'
            >
              <svg className={`h-6 w-6 transition-transform duration-150 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {mobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </Button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className='md:hidden border-t py-4'>
            <ul className='flex flex-col gap-2'>
              {navigateItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Button
                      onClick={() => handleNavigation(item.slug)}
                      variant={location.pathname === item.slug ? 'default' : 'ghost'}
                      className={`w-full justify-start ${location.pathname === item.slug ? 'pointer-events-none' : ''}`}
                    >
                      {item.name}
                    </Button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
