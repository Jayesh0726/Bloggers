import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login as authLogin, setOAuth2Session } from '../store/authSlice'
import { InputBox, Button, Logo, PasswordInput } from './index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Spinner } from './ui/spinner'
import { Chrome } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [error, setError] = useState("")
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)

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

  const login = async (data) => {
    setError("")
    try {
      const res = await authService.loginUser(data)
      if (res) {
        const user = await authService.getUserSession()
        if (user) dispatch(authLogin({ userData: user }))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    }
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
          <CardTitle className='text-3xl'>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue reading</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg'>
              <p className='text-sm text-destructive font-medium'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className='space-y-4'>            <Button
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
                  Signing in with Google...
                </>
              ) : (
                <>
                  <Chrome className="mr-2 size-4" />
                  Sign in with Google
                </>
              )}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t'></div>
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with email</span>
              </div>
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

            <PasswordInput
              label='Password'
              placeholder='Enter your password'
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className='text-right'>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>

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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className='mt-6 pt-6 border-t text-center text-sm'>
            <p>
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='font-semibold text-primary hover:underline'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login