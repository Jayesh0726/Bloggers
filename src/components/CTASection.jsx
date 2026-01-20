import React from 'react'
import { Button } from './ui/button'
import { Container } from './index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className='py-16 sm:py-20 md:py-28 lg:py-32'>
      <Container>
        <Card className='relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'>
          <div className='absolute inset-0 pointer-events-none opacity-30' aria-hidden>
            <div className='absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-bl from-primary/20 to-transparent blur-3xl'></div>
          </div>

          <CardHeader className='text-center relative'>
            <CardTitle className='text-3xl sm:text-4xl leading-tight'>
              Ready to start writing?
            </CardTitle>
            <CardDescription className='text-lg'>
              Join thousands of writers sharing their ideas and connecting with readers.
            </CardDescription>
          </CardHeader>

          <CardContent className='relative flex flex-col sm:flex-row gap-3 justify-center'>
            <Button size='lg' asChild>
              <a href='/signup' className='flex items-center gap-2'>
                Get started free <ArrowRight className='w-4 h-4' />
              </a>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <a href='/login'>Sign in to your account</a>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}
