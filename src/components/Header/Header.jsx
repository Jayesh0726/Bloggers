import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/button'

function Header() {
  const isAuthentication = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

          <ul className='hidden md:flex items-center gap-1'>
            {navigateItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button
                    onClick={() => handleNavigation(item.slug)}
                    variant='ghost'
                    size='sm'
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
          </ul>

          <div className='flex items-center gap-2 ml-auto md:ml-4'>
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

            {isAuthentication && (
              <div className='hidden sm:block'>
                <LogoutBtn />
              </div>
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
                      variant='ghost'
                      className='w-full justify-start'
                    >
                      {item.name}
                    </Button>
                  </li>
                ) : null
              )}
              {isAuthentication && (
                <li className='sm:hidden pt-2 border-t'>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
