import React from 'react'
import { Button } from './ui/button'
import { Container } from './index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function HeroSection() {
  return (
    <div className='relative mb-7 overflow-hidden'>
      <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover' src="../BlogWriteBgVideo.mp4"></video>
    <section className='relative py-16 sm:py-20 md:py-28 lg:py-40 min-h-screen flex items-center'>
      <Container>
        <Card className='relative border-dashed dark:bg-[#4141415e] bg-[#cacaca5e] backdrop-blur border-2 overflow-hidden h-auto min-h-[28rem] sm:min-h-[30rem] md:min-h-[32rem] py-16 sm:py-20 md:py-24'>
          <div className='absolute inset-0 pointer-events-none opacity-40' aria-hidden>
            <div className='absolute -left-10 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl'></div>
            <div className='absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl'></div>
          </div>

          <CardHeader className='text-center relative'>
            <div className='inline-block mx-auto mb-4 px-3 py-1.5 text-xs font-semibold uppercase rounded-full bg-primary/10'>
              Welcome to Bloggers
            </div>
            <CardTitle className='text-4xl sm:text-5xl leading-tight'>
              Share ideas in a calm, modern space
            </CardTitle>
            <CardDescription className='text-lg'>
              Discover thoughtful writing from the community. Create an account to read, write, and save your favorites.
            </CardDescription>
          </CardHeader>

          <CardContent className='relative flex flex-col sm:flex-row gap-3 justify-center'>
            <Button variant='default' size='lg' asChild>
              <a href='/login'>Sign in to read</a>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <a href='/signup'>Join the community</a>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
    </div>
  )
}
