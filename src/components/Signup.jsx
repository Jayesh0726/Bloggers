import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon, Chrome } from 'lucide-react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login, setOAuth2Session } from '../store/authSlice'
import { InputBox, Button, Logo, PasswordInput } from './index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'
import { Spinner } from './ui/spinner'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const [error, setError] = useState("")
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const password = watch("password")

  // Check for OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Add a small delay to ensure Appwrite has set the session cookie
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const user = await authService.getUserSession()
        if (user) {
          // Check if this is an OAuth session by looking for OAuth provider info
          dispatch(setOAuth2Session({ 
            userData: user, 
            session: user,
            provider: 'google'
          }))
          navigate("/")
        }
      } catch (err) {
        console.error("OAuth callback error:", err)
      }
    }
    handleOAuthCallback()
  }, [dispatch, navigate])

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true)
    try {
      await authService.loginWithGoogle()
    } catch (err) {
      setError(err.message)
      setIsLoadingGoogle(false)
    }
  }

  const createUser = async (data) => {
    setError("")
    try {
      if (!selectedDate) {
        setError("Please select your date of birth")
        return
      }
      
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const year = selectedDate.getFullYear()
      const birthdate = `${day}-${month}-${year}`
      
      const userData = await authService.createUser({ ...data, birthdate })
      if (userData) {
        // Store authenticated user in Redux
        dispatch(login({ userData }))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setDatePickerOpen(false)
  }

  return (
    <div className='w-full min-h-[calc(100vh-140px)] flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 rounded-lg border bg-background'>
              <Logo width='auto' />
            </div>
          </div>
          <CardTitle className='text-3xl'>Join Our Community</CardTitle>
          <CardDescription>Create an account to start sharing your stories</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg'>
              <p className='text-sm text-destructive font-medium'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(createUser)} className='space-y-4'>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className='w-full'
              onClick={handleGoogleLogin}
              disabled={isLoadingGoogle || isSubmitting}
            >
              {isLoadingGoogle ? (
                <>
                  <Spinner className="mr-2 size-4" />
                  Signing up with Google...
                </>
              ) : (
                <>
                  <Chrome className="mr-2 size-4" />
                  Sign up with Google
                </>
              )}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t'></div>
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or sign up with email</span>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputBox
                label='First Name'
                placeholder='John'
                error={errors.Firstname?.message}
                {...register("Firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters long"
                  }
                })}
              />
              
              <InputBox
                label='Last Name'
                placeholder='Doe'
                error={errors.Lastname?.message}
                {...register("Lastname", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters long"
                  }
                })}
              />
            </div>

            <InputBox
              label='Email Address'
              placeholder='you@example.com'
              type='email'
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                }
              })}
            />

            <div className='space-y-2'>
              <Label htmlFor="date" className="px-1">
                Date of Birth
              </Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {selectedDate ? selectedDate.toLocaleDateString('en-GB') : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    captionLayout="dropdown"
                    onSelect={handleDateSelect}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <PasswordInput
              label='Password'
              placeholder='Create a strong password'
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
            />

            <PasswordInput
              label='Confirm Password'
              placeholder='Confirm your password'
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
            />

            <Button
              type='submit'
              variant='default'
              size='lg'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 size-4" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className='mt-6 pt-6 border-t text-center text-sm'>
            <p>
              Already have an account?{' '}
              <Link
                to='/login'
                className='font-semibold text-primary hover:underline'
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup