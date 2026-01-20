import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { clearPosts } from '../../store/postSlice'
import authService from '../../appwrite/auth'
import { Button } from '../ui/button'

function LogoutBtn() {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await authService.logoutUser().then(() => {
        dispatch(logout())
        dispatch(clearPosts())
      })
    } catch (error) {
      console.log("Logout Error: ", error)
    }
  }
  return (
    <Button
      onClick={handleLogout}
      variant='default'
      size='sm'
      className='gap-2'
    >
      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
      </svg>
      <span>Logout</span>
    </Button>
  )
}

export default LogoutBtn