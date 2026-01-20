import React from 'react'
import fileservices from '../appwrite/storageconfig'
import { Link } from 'react-router-dom'
import { Card } from './ui/card'

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360" fill="none"><rect width="600" height="360" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="20" font-family="Arial, sans-serif">Image unavailable</text></svg>'

function PostCard({ $id, featuredImage, title }) {
  const previewUrl = featuredImage ? String(fileservices.getFileView(featuredImage)) : ''
  const imageSrc = previewUrl || PLACEHOLDER

  const handleImageError = (event) => {
    if (event?.currentTarget?.src !== PLACEHOLDER) {
      event.currentTarget.src = PLACEHOLDER
      console.error('Preview load failed', { featuredImage, previewUrl })
    }
  }

  return (
    <Link to={`/post/${$id}`} className='block h-full group'>
      <Card className='h-full overflow-hidden flex flex-col border border-border/50 hover:border-primary/30 bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1'>
        <div className='relative overflow-hidden h-40 sm:h-44 bg-muted'>
          <img
            src={imageSrc}
            alt={title}
            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
            loading='lazy'
            onError={handleImageError}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>

        <div className='p-4 flex-grow flex flex-col'>
          <h3 className='text-base sm:text-lg font-semibold leading-snug line-clamp-2 mb-3 text-foreground group-hover:text-primary transition-colors duration-200'>
            {title}
          </h3>
          <div className='mt-auto flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200'>
            <span>Read more</span>
            <svg className='w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default PostCard