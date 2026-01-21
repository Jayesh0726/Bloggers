import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dbConfig from "../appwrite/dbConfig"
import { setPosts, setLoading } from '../store/postSlice'
import { Container, PostCard } from '../components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'
import { Button } from '../components/ui/button'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import BenefitsSection from '../components/BenefitsSection'
import CTASection from '../components/CTASection'

function Home() {
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    const posts = useSelector((state) => state.post.posts)
    const loading = useSelector((state) => state.post.loading)

    useEffect(() => {
        // Always fetch posts when Home component mounts
        dispatch(setLoading(true))
        dbConfig.listArticles([]).then((response) => {
            if (response) {
                dispatch(setPosts(response.documents))
            }
        }).finally(() => dispatch(setLoading(false)))
    }, [dispatch])

    return (
        <div className='w-full'>
            {!authStatus ? (
                <div>
                    <HeroSection />
                    <FeaturesSection />
                    <BenefitsSection />
                    <CTASection />
                </div>
            ) : (
                <section className='py-2 sm:py-20 md:py-28 lg:py-10'>
                    <Container>
                        <div className='text-3xl font-bold'> Articles</div>
                    </Container>
                </section>
            )}

            {authStatus && posts.length > 0 && (
                <section className='pb-16 sm:pb-20 md:pb-28 lg:pb-32'>
                    <Container>
                        {loading ? (
                            <div className='flex flex-col justify-center items-center py-20'>
                                <Spinner className='mb-4' />
                                <p className='text-muted-foreground'>Loading articles...</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                                {posts.map((post) => (
                                    <div key={post.$id} className='h-full'>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Container>
                </section>
            )}

            
        </div>
    )
}

export default Home