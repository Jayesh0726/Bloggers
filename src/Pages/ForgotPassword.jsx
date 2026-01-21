import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { InputBox, Button, Logo } from '../components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleForgotPassword = async (data) => {
    setError("")
    setSuccess(false)
    try {
      await authService.sendPasswordRecoveryEmail(data.email)
      setSuccess(true)
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
              <Logo width='80px' />
            </div>
          </div>
          <CardTitle className='text-3xl'>Forgot Password?</CardTitle>
          <CardDescription>
            {success 
              ? "Check your email for password reset link" 
              : "Enter your email to receive a password reset link"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg'>
              <p className='text-sm text-destructive font-medium'>{error}</p>
            </div>
          )}

          {success ? (
            <div className='space-y-4'>
              <div className='p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg'>
                <p className='text-sm text-green-700 dark:text-green-400 font-medium'>
                  Password reset email sent! Check your inbox and follow the instructions.
                </p>
              </div>
              <Link to='/login' className='block'>
                <Button variant='outline' className='w-full'>
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleForgotPassword)} className='space-y-4'>
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
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}

          <div className='mt-6 pt-6 border-t text-center text-sm'>
            <p>
              Remember your password?{' '}
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

export default ForgotPassword
