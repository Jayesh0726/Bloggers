# Quick Reference - Design System Usage

## Theme Toggle
```jsx
import { useTheme } from '@/context/ThemeContext'

const { isDark, toggleTheme } = useTheme();
```

## Dark Mode Classes
```jsx
// Text colors
className='text-gray-900 dark:text-white'

// Background colors  
className='bg-white dark:bg-dark-800'

// Border colors
className='border-gray-200 dark:border-dark-700'

// Hover states
className='hover:bg-gray-50 dark:hover:bg-dark-700'

// Shadows
className='shadow-soft dark:shadow-none'
```

## Responsive Patterns

### Mobile-first approach
```jsx
// Mobile text, tablet larger, desktop largest
className='text-base sm:text-lg md:text-xl lg:text-2xl'

// Mobile padding, desktop more
className='px-4 sm:px-6 md:px-8 lg:px-12'

// Mobile 1 column, tablet 2, desktop 3
className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
```

## Button Variants

### Primary Button
```jsx
<Button variant='primary' size='md'>
  Action Button
</Button>
// or
<button className='btn-primary'>Action</button>
```

### Secondary Button
```jsx
<Button variant='secondary' size='md'>
  Secondary
</Button>
// or
<button className='btn-secondary'>Secondary</button>
```

### Outline Button
```jsx
<Button variant='outline' size='md'>
  Outline
</Button>
// or
<button className='btn-outline'>Outline</button>
```

## Card Component
```jsx
<div className='card'>
  <div className='h-48 bg-gray-200 dark:bg-dark-700 rounded-lg mb-4'/>
  <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
    Title
  </h3>
  <p className='text-gray-600 dark:text-gray-400'>Description</p>
</div>
```

## Form Inputs

### Text Input
```jsx
<InputBox
  label='Full Name'
  type='text'
  placeholder='John Doe'
  error={errors.name?.message}
  {...register('name', { required: true })}
/>
```

### Email Input
```jsx
<InputBox
  label='Email'
  type='email'
  placeholder='you@example.com'
  error={errors.email?.message}
  {...register('email', { 
    required: 'Email is required',
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: 'Invalid email format'
    }
  })}
/>
```

### Password Input
```jsx
<InputBox
  label='Password'
  type='password'
  placeholder='Secure password'
  error={errors.password?.message}
  {...register('password', { 
    required: 'Password is required',
    minLength: { value: 6, message: 'Min 6 characters' }
  })}
/>
```

### Select Dropdown
```jsx
<Select
  label='Category'
  options={['Tech', 'Lifestyle', 'Travel']}
  error={errors.category?.message}
  {...register('category', { required: 'Category is required' })}
/>
```

## Headers with Icons

### Header with Icon on Left
```jsx
<button className='btn-primary inline-flex items-center gap-2'>
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    {/* SVG path */}
  </svg>
  Button Text
</button>
```

### Icon-Only Button
```jsx
<button 
  className='p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors'
  aria-label='Menu'
>
  <svg className='w-6 h-6' fill='currentColor'>
    {/* SVG */}
  </svg>
</button>
```

## Common SVG Icons

### Menu/Hamburger
```jsx
<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
</svg>
```

### Close/X
```jsx
<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
</svg>
```

### Chevron Right
```jsx
<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
</svg>
```

### Chevron Left
```jsx
<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
</svg>
```

### Edit
```jsx
<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
</svg>
```

### Delete
```jsx
<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
</svg>
```

### Sun (Light Theme Icon)
```jsx
<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
  <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM2.929 2.929a1 1 0 011.414 0l.707.707A1 1 0 102.222 5.05l-.707-.707a1 1 0 000-1.414zm0 14.142a1 1 0 011.414 0l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 000 1.414zM17.07 17.071a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z' clipRule='evenodd'></path>
</svg>
```

### Moon (Dark Theme Icon)
```jsx
<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
</svg>
```

## Loading Spinner
```jsx
<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600'></div>
```

## Empty State
```jsx
<div className='text-center py-20'>
  <svg className='w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    {/* Icon SVG */}
  </svg>
  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
    No items found
  </h3>
  <p className='text-gray-600 dark:text-gray-400'>
    Check back soon for new content!
  </p>
</div>
```

## Alert/Error Message
```jsx
<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
  <p className='text-red-600 dark:text-red-400 text-sm'>Error message</p>
</div>
```

## Success Message
```jsx
<div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
  <p className='text-green-600 dark:text-green-400 text-sm'>Success message</p>
</div>
```

## Badge/Tag
```jsx
<span className='badge'>Label</span>
```

## Gradient Text
```jsx
<h1 className='gradient-text text-4xl font-bold'>
  Gradient Text
</h1>
```

## Container Usage
```jsx
import { Container } from '@/components'

<Container>
  {/* Content - automatically handles responsive padding and max-width */}
</Container>
```

## Center Content
```jsx
<div className='flex items-center justify-center min-h-screen'>
  {/* Vertically and horizontally centered */}
</div>
```

## Flex Gap Patterns
```jsx
// Gap between items
className='flex gap-4'        /* 1rem gap */
className='flex gap-6'        /* 1.5rem gap */
className='flex gap-8'        /* 2rem gap */

// Grid gap patterns
className='grid gap-6 sm:gap-8 lg:gap-12'
```

## Line Clamp
```jsx
// Limit to 1 line with ellipsis
className='line-clamp-1'

// Limit to 2 lines
className='line-clamp-2'

// Limit to 3 lines
className='line-clamp-3'
```

## Border Radius
```jsx
className='rounded-lg'       /* Default 0.5rem */
className='rounded-xl'       /* 0.75rem */
className='rounded-2xl'      /* 1rem */
className='rounded-full'     /* 9999px - perfect circles */
```

## Font Weights
```jsx
className='font-light'       /* 300 */
className='font-normal'      /* 400 */
className='font-medium'      /* 500 */
className='font-semibold'    /* 600 */
className='font-bold'        /* 700 */
```

## Shadow Utilities
```jsx
className='shadow-soft'      /* Light shadow */
className='shadow-medium'    /* Medium shadow */
className='shadow-lg'        /* Large shadow */
className='shadow-xl'        /* Extra large shadow */
className='hover:shadow-lg'  /* Shadow on hover */
```
