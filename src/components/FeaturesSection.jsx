import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Container } from './index'
import { Zap, Clock, Users, Shield, Sparkles, TrendingUp } from 'lucide-react'

const features = [
  {
    title: 'Write quickly',
    description: 'Create and publish in minutes with a focused, distraction-free editor.',
    icon: Sparkles,
    highlight: 'Fast publishing'
  },
  {
    title: 'Stay organized',
    description: 'Keep drafts, publish when ready, manage multiple posts effortlessly.',
    icon: Clock,
    highlight: 'Easy management'
  },
  {
    title: 'Meet people',
    description: 'Connect with writers who enjoy the same topics and share insights.',
    icon: Users,
    highlight: 'Community driven'
  },
  {
    title: 'Secure & private',
    description: 'Your content is protected with enterprise-grade security measures.',
    icon: Shield,
    highlight: 'Data safety'
  },
  {
    title: 'Rich formatting',
    description: 'Format your posts with embedded images, code blocks, and more.',
    icon: Zap,
    highlight: 'Full control'
  },
  {
    title: 'Grow your audience',
    description: 'Reach readers interested in your topics and build your following.',
    icon: TrendingUp,
    highlight: 'Discoverability'
  }
]

export default function FeaturesSection() {
  return (
    <section className='mt-48 py-16 sm:py-20 md:py-28 lg:py-32'>
      <Container>
        <div className='text-center max-w-3xl mx-auto space-y-4 mb-12'>
          <div className='inline-block px-3 py-1.5 text-xs font-semibold uppercase rounded-full bg-primary/10'>
            Why choose bloggers
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold leading-tight'>
            Everything you need to write
          </h2>
          <p className='text-lg text-muted-foreground'>
            A complete platform designed for writers of all levels. From quick notes to long-form essays.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.title} className='relative hover:border-primary/30 transition-colors'>
                <CardHeader>
                  <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2'>
                    <IconComponent className='w-6 h-6' />
                  </div>
                  <div className='flex items-start justify-between gap-2'>
                    <CardTitle className='text-xl'>{feature.title}</CardTitle>
                    <span className='text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap'>
                      {feature.highlight}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
