import React,{useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import dbServices from '../../appwrite/dbConfig';
import fileservices from '../../appwrite/storageconfig';
import {InputBox as Input, Button, Select, RTE} from '../index';
import { addPost, updatePost } from '../../store/postSlice';


function PostForm({post}) {
   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData) {
            console.error("User not authenticated");
            navigate("/login");
            return;
        }

        try {
            if (post) {
                const file = data.image[0] ? await fileservices.uploadFile(data.image[0]) : null;

                if (file) {
                    fileservices.deleteFile(post.featuredImage);
                }

                const dbPost = await dbServices.updateArticle(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    dispatch(updatePost(dbPost));
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await fileservices.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await dbServices.createArticle({ 
                        ...data, 
                        userId: userData.$id,
                        authorName: userData.name || 'Anonymous'
                    });

                    if (dbPost) {
                        dispatch(addPost(dbPost));
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="fade-in dark:bg-dark-subBase bg-light-surface rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto my-12">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0b0d12] dark:text-[#f5f6fb] mb-2">
                    {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-[#4b4f58] dark:text-[#a7adbe]">
                    {post ? "Update your article and share it with the world" : "Share your thoughts and ideas with our community"}
                </p>
            </div>
            
            <form onSubmit={handleSubmit(submit)} className="card bg-light-surface dark:bg-dark-subBase p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <Input
                                label="Title"
                                placeholder="Enter a compelling title..."
                                className="mb-4"
                                {...register("title", { required: true })}
                            />
                        </div>
                        <div>
                            <Input
                                label="Slug"
                                placeholder="auto-generated-slug"
                                className="mb-4"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />
                        </div>
                        <div>
                            <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="card p-6 bg-light-surface dark:bg-dark-subBase">
                            <h3 className="text-lg font-bold text-[#0f1116] dark:text-[#f5f6fb] mb-4">Post Settings</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Featured Image
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            className="mb-4"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image", { required: !post })}
                                        />
                                        {post && (
                                            <div className="w-full mb-4 rounded-lg overflow-hidden border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
                                                <img
                                                    src={fileservices.getFileView(post.featuredImage)}
                                                    alt={post.title}
                                                    className="w-full h-44 object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={["active", "inactive"]}
                                                label="Status"
                                                className="mb-4"
                                            />
                                        )}
                                    />
                                </div>
                                
                                <Button 
                                    type="submit" 
                                    variant="primary"
                                    size="lg"
                                    className="w-full cursor-pointer flex items-center justify-center gap-2 bg-light-base dark:bg-dark-surface border border-light-border dark:border-dark-border hover:bg-light-base/90 dark:hover:bg-dark-surface/90"
                                >
                                    {post ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Update Post
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Publish Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostForm