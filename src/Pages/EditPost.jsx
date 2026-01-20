import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import dbServices from "../appwrite/dbConfig";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            dbServices.getArticle(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8 sm:py-12 md:py-16'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
    <div className='min-h-[calc(100vh-140px)] flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 mb-4'></div>
        <p className='text-gray-600 dark:text-gray-400'>Loading post...</p>
      </div>
    </div>
  )
}

export default EditPost