import React from 'react'
import { Login as LoginComponent } from '../components'
function Login() {
  return (
    <div className='min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <LoginComponent />
      </div>
    </div>
  )
}

export default Login