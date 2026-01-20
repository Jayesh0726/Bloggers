# Visual Design System Overview

## Color Palette

### Primary Colors (Sky Blue)
```
Primary 50:   #f0f9ff
Primary 100:  #e0f2fe
Primary 200:  #bae6fd
Primary 300:  #7dd3fc
Primary 400:  #38bdf8
Primary 500:  #0ea5e9  ← Main brand color
Primary 600:  #0284c7  ← Used in buttons, links
Primary 700:  #0369a1
Primary 800:  #075985
Primary 900:  #0c3d66
```

### Neutral Colors (Light Theme)
```
Gray 50:      #f9fafb  ← Light backgrounds
Gray 100:     #f3f4f6
Gray 200:     #e5e7eb  ← Borders
Gray 300:     #d1d5db
Gray 400:     #9ca3af  ← Secondary text
Gray 500:     #6b7280
Gray 600:     #4b5563
Gray 700:     #374151
Gray 800:     #1f2937
Gray 900:     #111827  ← Main text
```

### Dark Colors (Dark Theme)
```
Dark 50:      #f9fafb
Dark 100:     #f3f4f6
Dark 200:     #e5e7eb
Dark 300:     #d1d5db
Dark 400:     #9ca3af
Dark 500:     #6b7280
Dark 600:     #4b5563
Dark 700:     #374151  ← Card backgrounds
Dark 800:     #1f2937  ← Surface backgrounds
Dark 900:     #111827
Dark 950:     #030712  ← Page background
```

## Typography System

### Font Family
- **Primary**: Inter (system fallback: ui-sans-serif, system-ui, -apple-system)
- **Fallback**: Arial, sans-serif

### Heading Scale

```
H1  │ Mobile: 24px (text-2xl)  │ Tablet: 32px (text-3xl)  │ Desktop: 48px (text-4xl)  │ Bold
H2  │ Mobile: 20px (text-xl)   │ Tablet: 28px (text-2xl)  │ Desktop: 36px (text-3xl)  │ Bold
H3  │ Mobile: 18px (text-lg)   │ Tablet: 22px (text-xl)   │ Desktop: 28px (text-2xl)  │ Bold
H4  │ Mobile: 16px (text-base) │ Tablet: 18px (text-lg)   │ Desktop: 22px (text-xl)   │ Bold
    │                           │                          │                           │
Body│ Mobile: 16px (text-base) │ Tablet: 16px (text-base) │ Desktop: 18px (text-lg)   │ Normal
    │                           │                          │                           │
Small│Mobile: 14px (text-sm)   │ Tablet: 14px (text-sm)   │ Desktop: 16px (text-base) │ Normal
Tiny │ Mobile: 12px (text-xs)  │ Tablet: 12px (text-xs)   │ Desktop: 14px (text-sm)   │ Normal
```

### Font Weights
```
Font Light     │ 300  │ For subtle text
Font Normal    │ 400  │ Body text
Font Medium    │ 500  │ Emphasis
Font Semibold  │ 600  │ Labels, secondary headings
Font Bold      │ 700  │ Main headings
```

## Spacing System

### Consistent Spacing Scale
```
0px    │ spacing-0
4px    │ spacing-1    (px-1, py-1, gap-1)
8px    │ spacing-2    (px-2, py-2, gap-2)
12px   │ spacing-3    (px-3, py-3, gap-3)
16px   │ spacing-4    (px-4, py-4, gap-4)  ← Mobile padding
20px   │ spacing-5    (px-5, py-5, gap-5)
24px   │ spacing-6    (px-6, py-6, gap-6)  ← Tablet padding
28px   │ spacing-7    (px-7, py-7, gap-7)
32px   │ spacing-8    (px-8, py-8, gap-8)  ← Desktop padding
36px   │ spacing-9    (px-9, py-9, gap-9)
40px   │ spacing-10   (px-10, py-10, gap-10)
48px   │ spacing-12   (px-12, py-12, gap-12)
64px   │ spacing-16   (px-16, py-16, gap-16)
80px   │ spacing-20   (px-20, py-20, gap-20)
96px   │ spacing-24   (px-24, py-24, gap-24)
```

### Padding Patterns
```
Mobile:  px-4 py-8    (16px horizontal, 32px vertical)
Tablet:  px-6 py-12   (24px horizontal, 48px vertical)
Desktop: px-8 py-16   (32px horizontal, 64px vertical)

Compact:  px-3 py-2   (Small forms, dense layouts)
Normal:   px-4 py-2.5 (Buttons, inputs)
Large:    px-6 py-3   (Featured elements)
XL:       px-8 py-4   (Hero sections)
```

## Shadows

### Shadow Hierarchy
```
Shadow Soft   │ 0 1px 3px 0 rgba(0,0,0,0.1)            │ Subtle, default
Shadow Medium │ 0 4px 6px -1px rgba(0,0,0,0.1)         │ Noticeable
Shadow Lg     │ 0 10px 15px -3px rgba(0,0,0,0.1)       │ Prominent
Shadow XL     │ 0 20px 25px -5px rgba(0,0,0,0.1)       │ Dramatic
```

### Usage
```
Cards:          shadow-soft (default hover: shadow-lg)
Buttons:        shadow-soft (hover: shadow-medium)
Modals:         shadow-xl
Tooltips:       shadow-lg
```

## Border Radius

```
rounded-lg    │ 8px     │ Cards, buttons, inputs
rounded-xl    │ 12px    │ Larger cards, images
rounded-2xl   │ 16px    │ Hero images, featured elements
rounded-full  │ 9999px  │ Avatars, circles
```

## Component Sizes

### Buttons
```
Button Small   │ px-3 py-1.5 │ text-sm │ height: 32px
Button Medium  │ px-6 py-2.5 │ text-base │ height: 40px (TOUCH TARGET MIN)
Button Large   │ px-8 py-3.5 │ text-lg │ height: 48px
```

### Input Fields
```
Input Height  │ py-2.5    │ height: 40px (TOUCH TARGET MIN)
Input Padding │ px-4      │ Comfortable horizontal space
Font Size     │ text-base │ 16px (prevents zoom on iOS)
```

### Icons
```
Small Icon   │ w-4 h-4   │ 16px
Normal Icon  │ w-5 h-5   │ 20px (in buttons)
Large Icon   │ w-6 h-6   │ 24px (in nav, alerts)
Hero Icon    │ w-16 h-16 │ 64px (in feature cards)
```

## Transitions & Animations

### Timing
```
Duration 200  │ 200ms  │ Quick interactions (button hover, color changes)
Duration 300  │ 300ms  │ Standard transitions (menu, modal)
Duration 500  │ 500ms  │ Slow animations (lazy load, page transition)
```

### Easing
```
ease-in       │ Accelerating
ease-out      │ Decelerating
ease-in-out   │ Smooth both ways
linear        │ Constant speed
```

### Common Transitions
```
transition-all duration-200        │ All properties
transition-colors duration-200     │ Color changes only
transition-transform duration-300  │ Scale, translate, rotate
transition-opacity duration-200    │ Fade in/out
```

## Responsive Grid System

### Column Layouts
```
Mobile      │ grid-cols-1   │ Single column
Tablet      │ grid-cols-2   │ Two columns
Desktop     │ grid-cols-3   │ Three columns
Wide        │ grid-cols-4   │ Four columns
```

### Common Patterns
```
// Blog grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// Dashboard
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

// Feature section
grid-cols-1 md:grid-cols-3

// Testimonials
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// Product showcase
grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
```

## Accessibility Standards

### Color Contrast
```
AAA Level (Preferred)  │ 7:1 ratio    │ All text
AA Level (Minimum)     │ 4.5:1 ratio  │ Normal text
                       │ 3:1 ratio    │ Large text
```

### Touch Targets
```
Minimum Size  │ 44px × 44px  │ Mobile interactions
Recommended   │ 48px × 48px  │ Better accessibility
Minimum Gap   │ 8px          │ Between buttons
```

### Focus Indicators
```
Focus Ring       │ 2px solid primary-600
Focus Ring Offset│ 2px
Visibility       │ Must have 3:1 contrast ratio
```

## Breakpoints & Device Sizes

```
Mobile         │ 0-640px   │ sm:    (min-width: 640px)
Tablet         │ 640-1024px│ md:    (min-width: 768px)
Desktop        │ 1024-1536px│ lg:   (min-width: 1024px)
Large Desktop  │ 1536px+   │ xl:    (min-width: 1280px)
               │           │ 2xl:   (min-width: 1536px)
```

## Component Library

### Buttons
```
┌─────────────────────────────────────┐
│ Primary Button                      │  ← btn-primary
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Secondary Button                    │  ← btn-secondary
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Outline Button                      │  ← btn-outline
└─────────────────────────────────────┘
```

### Input Fields
```
┌─────────────────────────────────────┐
│ Label                               │
├─────────────────────────────────────┤
│ Placeholder text or input value     │  ← input-field
└─────────────────────────────────────┘
```

### Cards
```
┌─────────────────────────────────────┐
│                                     │
│         Card Content                │  ← card
│                                     │
└─────────────────────────────────────┘
```

## Dark Mode Implementation

### CSS Classes
```
Light Mode  │ No prefix (default)
Dark Mode   │ dark: prefix

Example: className='bg-white dark:bg-dark-800'
```

### Color Mapping
```
Light Background │ bg-white        │ Dark Background │ dark:bg-dark-800
Light Text       │ text-gray-900   │ Dark Text       │ dark:text-white
Light Border     │ border-gray-200 │ Dark Border     │ dark:border-dark-700
Light Hover      │ hover:bg-gray-50│ Dark Hover      │ dark:hover:bg-dark-700
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Color stops (primary) | 10 |
| Spacing values | 24+ |
| Border radius values | 4 |
| Shadow levels | 4 |
| Responsive breakpoints | 6 |
| Button variants | 3 |
| Button sizes | 3 |
| Transition durations | 3 |
| Utility classes added | 8+ |

---

## Design Principles Applied

1. **Consistency** - Unified design language across all components
2. **Accessibility** - WCAG 2.1 AA compliance
3. **Responsiveness** - Works on all device sizes
4. **Usability** - Intuitive interactions and clear visual hierarchy
5. **Performance** - Optimized CSS and minimal JS
6. **Maintainability** - Organized, well-documented code
7. **Scalability** - Easy to extend and customize
8. **User Experience** - Smooth animations and clear feedback

---

**Last Updated**: January 2026
**Design System Version**: 2.0
**Status**: Production Ready
