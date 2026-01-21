import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'
import { Button } from '../components/ui/button'

function NotFound() {
  return (
    <div className='min-h-[70vh] flex items-center'>
      <Container>
        <div className='max-w-xl space-y-6'>
          <p className='text-sm font-semibold text-primary'>404</p>
          <h1 className='text-4xl sm:text-5xl font-bold leading-tight'>Page not found</h1>
          <p className='text-muted-foreground text-lg'>
            The page you are looking for does not exist or may have been moved. Check the URL or return to the homepage.
          </p>
          <div className='flex gap-3'>
            <Button asChild>
              <Link to='/'>Go home</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link to='/all-posts'>Browse posts</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
