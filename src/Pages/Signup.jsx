import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <SignupComponent />
      </div>
    </div>
  )
}

export default Signup