import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Container } from './index'
import { CheckCircle } from 'lucide-react'

const benefits = [
  {
    title: 'No coding required',
    description: 'Beautiful, professional-looking blog posts without touching a line of code.'
  },
  {
    title: 'Publish instantly',
    description: 'Hit publish and your article goes live immediately to all readers.'
  },
  {
    title: 'Analytics included',
    description: 'Track your post performance with built-in analytics and engagement metrics.'
  },
  {
    title: 'Mobile-first design',
    description: 'Perfect reading experience on phones, tablets, and desktops.'
  },
  {
    title: 'SEO optimized',
    description: 'Your posts are automatically optimized for search engines.'
  },
  {
    title: 'Share anywhere',
    description: 'Easy sharing to social media, email, and direct links.'
  }
]

export default function BenefitsSection() {
  return (
    <section className='py-16 sm:py-20 md:py-28 lg:py-32 bg-muted/30'>
      <Container>
        <div className='text-center max-w-3xl mx-auto space-y-4 mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold leading-tight'>
            Made for modern writers
          </h2>
          <p className='text-lg text-muted-foreground'>
            Everything is designed with writers and readers in mind.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {benefits.map((benefit) => (
            <div key={benefit.title} className='flex gap-4'>
              <div className='flex-shrink-0'>
                <CheckCircle className='w-6 h-6 text-primary mt-1' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-1'>{benefit.title}</h3>
                <p className='text-muted-foreground'>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
