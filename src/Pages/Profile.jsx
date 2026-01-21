import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, InputBox, PasswordInput } from '../components'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'

function Profile() {
  const user = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userPrefs, setUserPrefs] = useState({})

  const { register: registerName, handleSubmit: handleSubmitName, formState: { errors: nameErrors }, reset: resetName } = useForm({
    defaultValues: {
      Firstname: '',
      Lastname: ''
    }
  })

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors }, watch, reset: resetPassword } = useForm()

  // Fetch user preferences on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const prefs = await authService.getUserPreferences()
        setUserPrefs(prefs)
      } catch (err) {
        console.error('Error fetching preferences:', err)
      }
    }
    fetchPreferences()
  }, [])

  // Set default values when user data or preferences are available
  useEffect(() => {
    const firstname = userPrefs?.Firstname || user?.prefs?.Firstname || ''
    const lastname = userPrefs?.Lastname || user?.prefs?.Lastname || ''
    
    if (firstname || lastname) {
      resetName({
        Firstname: firstname,
        Lastname: lastname
      })
    }
  }, [user, userPrefs, resetName])

  const password = watch('password')

  const handleUpdateName = async (data) => {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      // Update name in account
      const fullName = `${data.Firstname} ${data.Lastname}`.trim()
      await authService.updateUserName(fullName)
      
      // Update preferences with individual fields
      await authService.updateUserPreferences({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        phone: userPrefs?.phone || user?.prefs?.phone || '',
        birthdate: userPrefs?.birthdate || user?.prefs?.birthdate || ''
      })

      // Refresh user session and preferences
      const updatedUser = await authService.getUserSession()
      if (updatedUser) {
        dispatch(login({ userData: updatedUser }))
      }
      
      const updatedPrefs = await authService.getUserPreferences()
      setUserPrefs(updatedPrefs)

      setSuccess('Name updated successfully!')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (data) => {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await authService.updateUserPassword({
        password: data.password,
        oldPassword: data.oldPassword
      })
      setSuccess('Password updated successfully!')
      resetPassword()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className='py-10 sm:py-16'>
      <div className='max-w-3xl mx-auto space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Profile Settings</h1>
            <p className='text-muted-foreground mt-1'>Manage your account details</p>
          </div>
          <Button variant='outline' onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {error && (
          <div className='p-4 bg-destructive/10 border border-destructive/30 rounded-lg'>
            <p className='text-sm text-destructive font-medium'>{error}</p>
          </div>
        )}

        {success && (
          <div className='p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg'>
            <p className='text-sm text-green-700 dark:text-green-400 font-medium'>{success}</p>
          </div>
        )}

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your basic account details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-2'>
              <p className='text-sm text-muted-foreground'>Email</p>
              <p className='text-lg font-semibold'>{user?.email || '—'}</p>
            </div>
            <div className='grid gap-2'>
              <p className='text-sm text-muted-foreground'>Birthdate</p>
              <p className='text-lg font-semibold'>{userPrefs?.birthdate || user?.prefs?.birthdate || '—'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Update Name */}
        <Card>
          <CardHeader>
            <CardTitle>Update Name</CardTitle>
            <CardDescription>Change your first and last name</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitName(handleUpdateName)} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <InputBox
                  label='First Name'
                  placeholder='John'
                  defaultValue={userPrefs?.Firstname || user?.prefs?.Firstname || ''}
                  error={nameErrors.Firstname?.message}
                  {...registerName("Firstname", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters"
                    }
                  })}
                />
                
                <InputBox
                  label='Last Name'
                  placeholder='Doe'
                  defaultValue={userPrefs?.Lastname || user?.prefs?.Lastname || ''}
                  error={nameErrors.Lastname?.message}
                  {...registerName("Lastname", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters"
                    }
                  })}
                />
              </div>

              <Button type='submit' disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Updating...
                  </>
                ) : (
                  'Update Name'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Update Password */}
        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPassword(handleUpdatePassword)} className='space-y-4'>
              <PasswordInput
                label='Current Password'
                placeholder='Enter your current password'
                error={passwordErrors.oldPassword?.message}
                {...registerPassword("oldPassword", {
                  required: "Current password is required"
                })}
              />

              <PasswordInput
                label='New Password'
                placeholder='Enter new password'
                error={passwordErrors.password?.message}
                {...registerPassword("password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />

              <PasswordInput
                label='Confirm New Password'
                placeholder='Confirm new password'
                error={passwordErrors.confirmPassword?.message}
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
              />

              <Button type='submit' disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

export default Profile
