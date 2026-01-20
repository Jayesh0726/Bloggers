import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 sm:py-12 md:py-16'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost