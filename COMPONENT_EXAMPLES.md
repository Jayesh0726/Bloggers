# Component Usage Examples

## Table of Contents
1. [Theme System](#theme-system)
2. [Layout Components](#layout-components)
3. [Form Components](#form-components)
4. [Button Components](#button-components)
5. [Card & Display](#card--display)
6. [Navigation](#navigation)
7. [Real-World Examples](#real-world-examples)

---

## Theme System

### Using Dark Mode in Components

```jsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className='bg-white dark:bg-dark-800 text-gray-900 dark:text-white'>
      <h1>Current theme: {isDark ? 'Dark' : 'Light'}</h1>
      <button 
        onClick={toggleTheme}
        className='btn-primary'
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

### Conditional Styling Based on Theme

```jsx
function DarkModeExample() {
  const { isDark } = useTheme();

  return (
    <div>
      {isDark ? (
        <img src='dark-logo.png' alt='Logo' />
      ) : (
        <img src='light-logo.png' alt='Logo' />
      )}
    </div>
  );
}
```

---

## Layout Components

### Container Component

```jsx
import { Container } from '@/components'

function Page() {
  return (
    <Container>
      {/* Automatically responsive padding and max-width */}
      <h1>Welcome</h1>
      <p>Content here</p>
    </Container>
  );
}
```

### Responsive Grid Layout

```jsx
function ResponsiveGrid() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
      {items.map(item => (
        <div key={item} className='card p-4'>
          {item}
        </div>
      ))}
    </div>
  );
}
```

### Responsive Flex Layout

```jsx
function ResponsiveFlex() {
  return (
    <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
      <h1 className='text-2xl font-bold'>Title</h1>
      <button className='btn-primary'>Action</button>
    </div>
  );
}
```

### Hero Section

```jsx
function HeroSection() {
  return (
    <section className='py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-800 dark:to-dark-900'>
      <Container>
        <div className='text-center max-w-3xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text'>
            Welcome to Our Site
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8'>
            Amazing description here
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='btn-primary'>Primary Action</button>
            <button className='btn-outline'>Secondary Action</button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

---

## Form Components

### Simple Form

```jsx
import { InputBox, Select, Button } from '@/components'
import { useForm } from 'react-hook-form'

function SimpleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 max-w-md'>
      <InputBox
        label='Full Name'
        placeholder='John Doe'
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />

      <InputBox
        label='Email'
        type='email'
        placeholder='john@example.com'
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })}
      />

      <Select
        label='Category'
        options={['Technology', 'Lifestyle', 'Travel']}
        error={errors.category?.message}
        {...register('category', { required: 'Please select a category' })}
      />

      <Button type='submit' variant='primary' className='w-full'>
        Submit
      </Button>
    </form>
  );
}
```

### Login Form with Validation

```jsx
function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      // API call here
      console.log('Logging in:', data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='card p-8 w-full max-w-md mx-auto'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Sign In
      </h2>

      {error && (
        <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputBox
          label='Email'
          type='email'
          placeholder='your@email.com'
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email'
            }
          })}
        />

        <InputBox
          label='Password'
          type='password'
          placeholder='Your password'
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min 6 characters' }
          })}
        />

        <Button
          type='submit'
          variant='primary'
          className='w-full justify-center'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
```

### Multi-Column Form

```jsx
function MultiColumnForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className='space-y-5'>
      {/* Two column layout on desktop */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
        <InputBox
          label='First Name'
          {...register('firstName', { required: 'Required' })}
        />
        <InputBox
          label='Last Name'
          {...register('lastName', { required: 'Required' })}
        />
      </div>

      {/* Full width */}
      <InputBox
        label='Email'
        type='email'
        {...register('email', { required: 'Required' })}
      />

      {/* Three column layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <InputBox label='City' {...register('city')} />
        <InputBox label='State' {...register('state')} />
        <InputBox label='ZIP Code' {...register('zip')} />
      </div>

      <Button type='submit' variant='primary' className='w-full'>
        Submit
      </Button>
    </form>
  );
}
```

---

## Button Components

### Button Variants

```jsx
function ButtonVariants() {
  return (
    <div className='space-y-4'>
      {/* Primary Button */}
      <Button variant='primary' size='md'>
        Primary Button
      </Button>

      {/* Secondary Button */}
      <Button variant='secondary' size='md'>
        Secondary Button
      </Button>

      {/* Outline Button */}
      <Button variant='outline' size='md'>
        Outline Button
      </Button>

      {/* Button Sizes */}
      <div className='flex gap-2'>
        <Button variant='primary' size='sm'>Small</Button>
        <Button variant='primary' size='md'>Medium</Button>
        <Button variant='primary' size='lg'>Large</Button>
      </div>

      {/* With Icons */}
      <div className='space-y-2'>
        <Button variant='primary' className='w-full'>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            {/* Icon SVG */}
          </svg>
          Button with Icon
        </Button>
      </div>

      {/* Disabled State */}
      <Button variant='primary' disabled>
        Disabled Button
      </Button>
    </div>
  );
}
```

### Button Groups

```jsx
function ButtonGroup() {
  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      <button className='btn-primary flex-1 sm:flex-none'>
        Save
      </button>
      <button className='btn-secondary flex-1 sm:flex-none'>
        Cancel
      </button>
      <button className='btn-outline flex-1 sm:flex-none'>
        Delete
      </button>
    </div>
  );
}
```

---

## Card & Display

### Post Card

```jsx
import { PostCard } from '@/components'

function PostGrid() {
  const posts = [
    { $id: '1', title: 'Post 1', featuredImage: 'image.jpg' },
    { $id: '2', title: 'Post 2', featuredImage: 'image.jpg' },
    { $id: '3', title: 'Post 3', featuredImage: 'image.jpg' },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
      {posts.map(post => (
        <div key={post.$id}>
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}
```

### Feature Card

```jsx
function FeatureCard({ title, description, icon }) {
  return (
    <div className='card p-6 text-center'>
      <div className='w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4'>
        {icon}
      </div>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
        {title}
      </h3>
      <p className='text-gray-600 dark:text-gray-400'>
        {description}
      </p>
    </div>
  );
}
```

### Stats Card

```jsx
function StatsCard({ number, label }) {
  return (
    <div className='card p-6 text-center'>
      <p className='text-4xl font-bold gradient-text mb-2'>
        {number}
      </p>
      <p className='text-gray-600 dark:text-gray-400'>
        {label}
      </p>
    </div>
  );
}
```

---

## Navigation

### Mobile Responsive Navigation

```jsx
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo */}
          <div className='text-2xl font-bold gradient-text'>
            Logo
          </div>

          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-6'>
            <li><a href='/' className='text-gray-700 dark:text-gray-200 hover:text-primary-600'>Home</a></li>
            <li><a href='/about' className='text-gray-700 dark:text-gray-200 hover:text-primary-600'>About</a></li>
            <li><a href='/posts' className='text-gray-700 dark:text-gray-200 hover:text-primary-600'>Posts</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-2'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden pb-4 border-t border-gray-200 dark:border-dark-700'>
            <ul className='flex flex-col gap-2 mt-4'>
              <li><a href='/' className='block px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg'>Home</a></li>
              <li><a href='/about' className='block px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg'>About</a></li>
              <li><a href='/posts' className='block px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg'>Posts</a></li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
```

---

## Real-World Examples

### Article Detail Page

```jsx
import { Container, Button } from '@/components'
import { Link } from 'react-router-dom'

function ArticleDetail({ article }) {
  return (
    <div className='w-full py-12 sm:py-16 md:py-20 px-4'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          {/* Featured Image */}
          <div className='rounded-2xl overflow-hidden mb-8 shadow-lg'>
            <img
              src={article.image}
              alt={article.title}
              className='w-full h-96 object-cover'
            />
          </div>

          {/* Title & Meta */}
          <div className='mb-8'>
            <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              {article.title}
            </h1>

            <div className='flex flex-col sm:flex-row gap-4 text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-dark-700'>
              <div className='flex items-center gap-3'>
                <img src={article.author.avatar} className='w-10 h-10 rounded-full' />
                <div>
                  <p className='font-medium text-gray-900 dark:text-white'>
                    {article.author.name}
                  </p>
                  <p className='text-sm'>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='prose dark:prose-invert max-w-none mb-12'>
            {article.content}
          </div>

          {/* Back Button */}
          <Link to='/posts' className='btn-secondary inline-flex items-center gap-2'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back to Articles
          </Link>
        </div>
      </Container>
    </div>
  );
}
```

### Loading State

```jsx
function DataList({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600'></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='text-center py-20'>
        <p className='text-gray-600 dark:text-gray-400'>No data found</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {data.map(item => (
        <div key={item.id} className='card p-4'>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### Empty State

```jsx
function EmptyState() {
  return (
    <div className='text-center py-20'>
      <svg className='w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
      </svg>
      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
        No items found
      </h3>
      <p className='text-gray-600 dark:text-gray-400 mb-6'>
        Start by creating your first item
      </p>
      <button className='btn-primary'>
        Create Item
      </button>
    </div>
  );
}
```

---

## Additional Resources

- **DESIGN_SYSTEM.md** - Complete design system reference
- **QUICK_REFERENCE.md** - Quick copy-paste snippets
- **RESPONSIVE_DESIGN.md** - Responsive patterns guide
- **tailwind.config.js** - Configuration and color palette

All components are fully responsive and support dark mode automatically!
