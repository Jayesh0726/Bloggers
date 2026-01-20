import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { InputBox } from './index'

const PasswordInput = React.forwardRef(({ label, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='relative'>
      <InputBox
        ref={ref}
        label={label}
        type={showPassword ? 'text' : 'password'}
        error={error}
        {...props}
      />
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute right-3 top-7 text-muted-foreground hover:text-foreground transition-colors duration-200'
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex='-1'
      >
        {showPassword ? (
          <EyeOff className='w-4' />
        ) : (
          <Eye className='w-4' />
        )}
      </button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
