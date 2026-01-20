import React, {useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Query } from 'appwrite'
import { Container, PostCard, Button } from '../components'
import dbServices from "../appwrite/dbConfig";
import { setPosts, setLoading } from '../store/postSlice';

function AllPosts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const loading = useSelector((state) => state.post.loading);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthed = useSelector((state) => state.auth.status);

    const userPosts = useMemo(() => {
        if (!userData) return [];
        return posts.filter((p) => p.userId === userData.$id);
    }, [posts, userData]);

    useEffect(() => {
        if (!userData) {
            dispatch(setPosts([]));
            dispatch(setLoading(false));
            return;
        }

        if (userPosts.length === 0) {
            dispatch(setLoading(true));
            dbServices.listArticles([Query.equal("userId", userData.$id)]).then((response) => {
                if (response) {
                    dispatch(setPosts(response.documents));
                }
            }).finally(() => dispatch(setLoading(false)));
        }
    }, [userData, userPosts.length, dispatch])

    return (
        <div className='w-full'>
            <section className='py-14 sm:py-18 md:py-20 px-4'>
                <Container>
                    <div className='text-center max-w-3xl mx-auto space-y-4 fade-in'>
                        <span className='inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2b303a] dark:text-[#d9def0] bg-black/5 dark:bg-white/10 rounded-full border border-black/5 dark:border-white/10'>
                            All articles
                        </span>
                        <h1 className='text-4xl sm:text-5xl font-bold leading-tight text-[#0b0d12] dark:text-[#f5f6fb]'>
                            The full library
                        </h1>
                        <p className='text-lg text-[#444854] dark:text-[#b5bdd3]'>
                            Every post from our community, organized for relaxed browsing.
                        </p>
                    </div>
                </Container>
            </section>

            <section className='pb-16 sm:pb-18 md:pb-20 px-4'>
                <Container>
                    {!isAuthed ? (
                        <div className='text-center py-16 fade-in'>
                            <h3 className='text-2xl font-bold text-[#0b0d12] dark:text-[#f5f6fb] mb-2'>Please log in</h3>
                            <p className='text-[#4b4f58] dark:text-[#a7adbe] text-lg'>Sign in to view your posts.</p>
                        </div>
                    ) : loading ? (
                        <div className='flex flex-col justify-center items-center py-16'>
                            <div className='animate-spin rounded-full h-12 w-12 border-3 border-black/10 dark:border-white/15 border-t-[#5c6fff] mb-4'></div>
                            <p className='text-[#4b4f58] dark:text-[#a7adbe]'>Loading articles...</p>
                        </div>
                    ) : userPosts.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                            {userPosts.map((post, index) => (
                                <div key={post.$id} className='h-full slide-up' style={{ animationDelay: `${index * 0.08}s` }}>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-16 fade-in space-y-4'>
                            <div className='inline-flex p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 mb-2'>
                                <svg className='w-14 h-14 text-[#7b8190] dark:text-[#9da4ba] mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                            </div>
                            <h3 className='text-2xl font-bold text-[#0b0d12] dark:text-[#f5f6fb]'>You haven't posted yet</h3>
                            <p className='text-[#4b4f58] dark:text-[#a7adbe] text-lg'>Create your first article to share with the community.</p>
                            <div className='flex justify-center'>
                                <Link to='/add-post'>
                                    <Button variant='primary'>Create Post</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}

export default AllPosts