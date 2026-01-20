# Responsive Design Guide

## Tailwind Breakpoints

| Breakpoint | CSS | Min Width | Usage |
|-----------|-----|-----------|-------|
| Mobile | None | 0px | Mobile phones (default) |
| `sm` | `@media (min-width: 640px)` | 640px | Small tablets & large phones |
| `md` | `@media (min-width: 768px)` | 768px | Tablets |
| `lg` | `@media (min-width: 1024px)` | 1024px | Laptops & desktops |
| `xl` | `@media (min-width: 1280px)` | 1280px | Large desktops |
| `2xl` | `@media (min-width: 1536px)` | 1536px | Extra large screens |

## Mobile-First Approach

The design system follows a **mobile-first** approach, meaning:
1. Start with mobile styles (no prefix)
2. Add tablet styles with `sm:` prefix
3. Add desktop styles with `md:`, `lg:`, etc.

**Example:**
```jsx
// Mobile: 1 column, 16px text
// Tablet (640px+): 2 columns, 18px text  
// Desktop (1024px+): 3 columns, 20px text
className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-base sm:text-lg lg:text-xl'
```

## Common Responsive Patterns

### 1. Typography Scaling
```jsx
// Scale heading from 24px (mobile) → 32px (tablet) → 48px (desktop)
className='text-2xl sm:text-3xl lg:text-5xl'

// Scale body text
className='text-sm sm:text-base lg:text-lg'
```

### 2. Spacing/Padding
```jsx
// Padding scales: 16px → 24px → 32px
className='px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'

// Gap in grids scales: 16px → 24px → 32px
className='gap-4 sm:gap-6 lg:gap-8'
```

### 3. Grid Layouts
```jsx
// 1 column on mobile, 2 on tablet, 3 on desktop
className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

// 2 columns on mobile, 3 on tablet, 4 on desktop
className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'

// Card grid with aspect ratio
className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
```

### 4. Flexbox Layouts
```jsx
// Stack on mobile, side-by-side on desktop
className='flex flex-col sm:flex-row gap-4'

// Centered on mobile, spaced on desktop
className='flex flex-col sm:flex-row justify-between items-start sm:items-center'
```

### 5. Height Adjustments
```jsx
// Image heights: 192px → 224px → 384px
className='h-48 sm:h-56 md:h-96'

// Container heights
className='min-h-screen sm:min-h-[calc(100vh-100px)]'
```

### 6. Display Control
```jsx
// Hide on mobile, show on tablet+
className='hidden sm:block'

// Show on mobile, hide on tablet+
className='sm:hidden'

// Show only on desktop
className='hidden lg:block'
```

### 7. Font Sizes
```jsx
// Responsive heading
className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'

// Responsive paragraph
className='text-sm sm:text-base md:text-lg'

// Responsive button text
className='text-xs sm:text-sm md:text-base'
```

### 8. Button Sizing
```jsx
// Small mobile, large desktop
className='px-3 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base'

// Full width on mobile, auto on desktop
className='w-full sm:w-auto'

// Full width button on mobile, inline on tablet+
className='block sm:inline-block w-full sm:w-auto'
```

### 9. Modal/Card Sizing
```jsx
// Full width with padding on mobile, max-width on desktop
className='w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto'

// Responsive padding
className='p-4 sm:p-6 lg:p-8'
```

### 10. Navigation Patterns
```jsx
// Mobile menu (hamburger), desktop nav (horizontal)
className='hidden sm:flex'                    // Hide on mobile
className='sm:hidden'                         // Show only on mobile

// Mobile: collapse, Desktop: expand
className='h-0 sm:h-auto overflow-hidden sm:overflow-visible'
```

## Device Specifications

### Mobile
- **Device**: iPhone SE, iPhone 12/13/14 mini
- **Width**: 320px - 480px
- **Styles**: Single column, larger padding, bigger touch targets
- **Font sizes**: 16px base
- **Breakpoint**: Default (no prefix)

**Tips for Mobile:**
```jsx
// Large touch targets (minimum 44x44px)
className='px-4 py-2.5'

// Single column layout
className='flex flex-col gap-4'

// Clear visual hierarchy
className='text-lg font-bold'

// Readable line length (< 50 characters)
className='max-w-xs'
```

### Tablet (Small Tablet)
- **Device**: iPad mini, Samsung Tab A
- **Width**: 480px - 768px
- **Breakpoint**: `sm:` (640px+)
- **Font sizes**: 18px base
- **Layout**: 2 columns for some content

**Common Tablet Patterns:**
```jsx
className='grid grid-cols-1 sm:grid-cols-2 gap-6'
className='text-lg sm:text-xl'
className='px-6 sm:px-8 py-8 sm:py-12'
```

### Tablet (Large Tablet)
- **Device**: iPad (10.9"), iPad Pro (11")
- **Width**: 768px - 1024px
- **Breakpoint**: `md:` (768px+)
- **Font sizes**: 18px-20px base
- **Layout**: 2-3 columns for content

### Desktop
- **Device**: Laptop, Desktop monitor
- **Width**: 1024px+
- **Breakpoint**: `lg:` (1024px+)
- **Font sizes**: 16px base
- **Layout**: 3+ columns, full width utilization

**Desktop Considerations:**
```jsx
// Wider layouts
className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

// Better use of white space
className='px-8 py-16'

// More content per view
className='max-w-7xl'
```

### Large Desktop
- **Device**: Large monitors (27"+ or 2560px+)
- **Breakpoint**: `xl:` (1280px+), `2xl:` (1536px+)

## Responsive Images

```jsx
// Responsive image sizes
<img 
  src={imageSrc}
  alt='description'
  className='w-full h-auto object-cover rounded-lg'
/>

// Picture element for different sources
<picture>
  <source media='(min-width: 1024px)' srcSet='large.jpg' />
  <source media='(min-width: 640px)' srcSet='medium.jpg' />
  <img src='small.jpg' alt='responsive' className='w-full' />
</picture>
```

## Responsive Forms

```jsx
// Mobile: full width, Desktop: side by side
<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
  <InputBox label='First Name' />
  <InputBox label='Last Name' />
</div>

// Full width select on mobile
<Select 
  className='w-full'
  label='Choose option'
  options={options}
/>

// Responsive button group
<div className='flex flex-col sm:flex-row gap-3'>
  <Button className='flex-1 sm:flex-none'>Save</Button>
  <Button className='flex-1 sm:flex-none' variant='secondary'>Cancel</Button>
</div>
```

## Testing Responsive Design

### Viewport Sizes to Test
1. **Mobile** (375px × 667px) - iPhone SE
2. **Mobile Large** (414px × 896px) - iPhone 11
3. **Tablet** (768px × 1024px) - iPad
4. **Desktop** (1024px × 768px) - Laptop
5. **Desktop Large** (1920px × 1080px) - Large monitor

### Browser DevTools Testing
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device presets
4. Test rotation (landscape/portrait)
5. Test zoom levels

### Performance Considerations
- Images scale appropriately
- Text remains readable
- No horizontal scrolling
- Touch targets adequate (44px minimum)
- Load times acceptable

## Common Responsive Issues & Solutions

### Issue: Text too small on mobile
**Solution:**
```jsx
// Bad
className='text-sm'

// Good
className='text-base sm:text-lg lg:text-xl'
```

### Issue: Overflow on mobile
**Solution:**
```jsx
// Bad
className='w-full grid grid-cols-4'

// Good
className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
```

### Issue: Elements too cramped on mobile
**Solution:**
```jsx
// Bad
className='p-2 gap-2'

// Good
className='p-4 sm:p-6 gap-4 sm:gap-6'
```

### Issue: Image stretches on desktop
**Solution:**
```jsx
// Bad
<img src={src} className='w-full' />

// Good
<img src={src} className='w-full max-w-2xl h-auto object-cover' />
```

## Responsive Typography Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | 24px (text-2xl) | 32px (text-3xl) | 48px (text-4xl) |
| H2 | 20px (text-xl) | 28px (text-2xl) | 36px (text-3xl) |
| H3 | 18px (text-lg) | 22px (text-xl) | 28px (text-2xl) |
| H4 | 16px (text-base) | 18px (text-lg) | 22px (text-xl) |
| Body | 16px (text-base) | 16px (text-base) | 18px (text-lg) |
| Small | 14px (text-sm) | 14px (text-sm) | 16px (text-base) |
| Tiny | 12px (text-xs) | 12px (text-xs) | 14px (text-sm) |

## Best Practices Checklist

- [ ] Mobile-first approach used
- [ ] All breakpoints tested (sm, md, lg)
- [ ] Text remains readable on all sizes
- [ ] Images scale appropriately
- [ ] No content cut off or hidden inappropriately
- [ ] Touch targets are 44px minimum on mobile
- [ ] Navigation collapses on mobile
- [ ] Forms are single column on mobile
- [ ] Horizontal scrolling avoided
- [ ] Page performs well on 3G (test in DevTools)
