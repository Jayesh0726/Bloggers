import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { PasswordInput, Button, Logo } from '../components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  const password = watch('password')

  useEffect(() => {
    if (!userId || !secret) {
      setError("Invalid password reset link. Please request a new one.")
    }
  }, [userId, secret])

  const handleResetPassword = async (data) => {
    setError("")
    if (!userId || !secret) {
      setError("Invalid password reset link")
      return
    }

    try {
      await authService.resetPassword({
        userId,
        secret,
        password: data.password
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
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
          <CardTitle className='text-3xl'>Reset Password</CardTitle>
          <CardDescription>
            {success 
              ? "Password reset successful! Redirecting to login..." 
              : "Enter your new password"
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
                  Your password has been reset successfully! Redirecting to login...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleResetPassword)} className='space-y-4'>
              <PasswordInput
                label='New Password'
                placeholder='Enter your new password'
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />

              <PasswordInput
                label='Confirm Password'
                placeholder='Confirm your new password'
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
                disabled={isSubmitting || !userId || !secret}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
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

export default ResetPassword
