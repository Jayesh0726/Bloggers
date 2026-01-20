import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbConfig from "../appwrite/dbConfig";
import fileservices from "../appwrite/storageconfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { deletePost as deletePostAction } from "../store/postSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            dbConfig.getArticle(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
        console.log(userData);
    }, [slug, navigate]);

    const deletePost = () => {
        dbConfig.deleteArticle(post.$id).then((status) => {
            if (status) {
                fileservices.deleteFile(post.featuredImage);
                dispatch(deletePostAction(post.$id));
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className='min-h-[calc(100vh-140px)] flex items-center justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-3 border-black/10 dark:border-white/15 border-t-[#5c6fff]'></div>
            </div>
        );
    }

    return post ? (
        <div className='w-full py-12 sm:py-16 md:py-20 px-4 fade-in'>
            <Container>
                <div className='max-w-4xl mx-auto mb-8 sm:mb-12'>
                    <div className='relative rounded-2xl overflow-hidden mb-10 border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5'>
                        <img
                            src={fileservices.getFileView(post.featuredImage)}
                            alt={post.title}
                            className='w-full h-auto object-contain transition-transform duration-700 ease-out'
                        />
                    </div>

                    <div className='mb-8 space-y-6'>
                        <h1 className='text-4xl sm:text-5xl font-bold text-[#0b0d12] dark:text-[#f5f6fb] leading-tight'>
                            {post.title}
                        </h1>
                        
                        <div className='flex flex-col sm:flex-row sm:items-center gap-4 text-[#4b4f58] dark:text-[#a7adbe] pb-6 border-b border-black/5 dark:border-white/10'>
                            <div className='flex items-center gap-3'>
                                <div className='w-11 h-11 rounded-full bg-[#111318] dark:bg-white/10 text-white dark:text-[#f5f6fb] flex items-center justify-center font-semibold text-lg shadow-sm'>
                                    {userData.name?.[0]?.toUpperCase() || 'A'}
                                </div>
                                <div>
                                    <p className='font-semibold text-[#0f1116] dark:text-[#f5f6fb]'>Author</p>
                                    <p className='text-sm text-[#5a5e68] dark:text-[#b5bdd3]'>by {userData.name} {userData.lastname}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 text-sm'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                                <span>
                                    {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isAuthor && (
                        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                            <Link to={`/edit-post/${post.$id}`} className='flex-1 sm:flex-none'>
                                <Button variant='primary' className='w-full sm:w-auto'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                    </svg>
                                    Edit Post
                                </Button>
                            </Link>
                            <button
                                onClick={deletePost}
                                className='btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto'
                            >
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                </svg>
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>

                <div className='max-w-4xl mx-auto prose'>
                    {(() => {
                        const content = post.content || "";
                        const hasHtml = /<\/?[a-z][\s\S]*>/i.test(content);
                        if (hasHtml) {
                            return parse(content);
                        }
                        const html = content
                            .trim()
                            .split(/\n{2,}/)
                            .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
                            .join('');
                        return parse(html);
                    })()}
                </div>

                <div className='max-w-4xl mx-auto mt-12 sm:mt-16'>
                    <Link to='/all-posts' className='btn-secondary inline-flex items-center gap-2 group'>
                        <svg className='w-5 h-5 group-hover:-translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                        Back to Articles
                    </Link>
                </div>
            </Container>
        </div>
    ) : null;
}
