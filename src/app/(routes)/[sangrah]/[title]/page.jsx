'use client';
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PageHeader from "../../../compotents/PageHeader";
import DataLoader from "../../../compotents/DataLoader";
import PostCard from "../../../compotents/PostCard";
import PostCommentForm from "../../../compotents/PostCommentForm";
import SangrahSidebar from "../../../compotents/sangrahSidebar";

const Page = () => {
    const params = useParams();
    const { title } = params;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [after, setAfter] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [LoadMoreLoading, setLoadMoreLoading] = useState(false);
    const [fetchType, setFetchType] = useState(null);
    const [postDetail, setPostDetail] = useState(null);
    const [error, setError] = useState(null);

    const CategoryList = ['ram', 'krishna', 'khatu-shaym', 'ganesh', 'garba', 'gurudev', 'tulshi-ji', 'durga', 'pitra-ji'];


    const fetchSangrahPosts = async (cursor = null, categorySlug) => {
        hasNextPage ? setLoadMoreLoading(true) : setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                    query GetSangrahByCategory($categorySlug: ID!, $first: Int!, $after: String) {
                      sangrahCategory(id: $categorySlug, idType: SLUG) {
                        name
                        taxonomyName
                        sangrah(first: $first, after: $after) {
                          nodes {
                            title
                            slug
                            excerpt
                            featuredImage {
                              node {
                                mediaItemUrl
                                altText
                              }
                            }
                          }
                          pageInfo {
                            hasNextPage
                            endCursor
                          }
                        }
                      }
                    }`,
                    variables: {
                        categorySlug,
                        first: 10,
                        after: cursor,
                    },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            const { data } = await res.json();

            if (data?.sangrahCategory?.sangrah) {
                setPosts((prev) => [...prev, ...data.sangrahCategory.sangrah.nodes]);
                setAfter(data.sangrahCategory.sangrah.pageInfo.endCursor);
                setHasNextPage(data.sangrahCategory.sangrah.pageInfo.hasNextPage);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts. Please try again later.");
        } finally {
            setLoading(false);
            setLoadMoreLoading(false);
        }
    };

    const fetchPostDetail = async (postSlug) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                    query sangrahDetail($postSlug: String!) {
                        sangrahBy(slug: $postSlug) {
                            title
                            databaseId
                            featuredImage {
                                node {
                                    altText
                                    mediaItemUrl
                                }
                            }
                            content
                            sangrahFields {
                                videoUrl
                            }
                            tags {
                                nodes {
                                    name
                                    uri
                                }
                            }
                        }
                    }`,
                    variables: { postSlug },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            const { data } = await res.json();
            setPostDetail(data?.sangrahBy);
        } catch (err) {
            console.error("Error fetching post detail:", err);
            setError("Failed to load post details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isCategory = CategoryList.includes(title);
        setFetchType(isCategory);

        if (isCategory) {
            fetchSangrahPosts(null, 'ram');
        } else {
            fetchPostDetail(title);
        }
    }, [title]);

    return (
        <>
            <PageHeader title={fetchType ? title : postDetail?.title} />
            <div className="container">
                <div className="flex gap-8">
                    <div className="basis-[70%]">
                        {loading ? (
                            <DataLoader title={`Loading ${fetchType ? title : 'Post Details'}`} />
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : fetchType ? (
                            // ✅ **Render Post List if fetchType is TRUE**
                            <>
                                {posts.length === 0 ? (
                                    <p>No posts found.</p>
                                ) : (
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                    {posts.map((post, index) => (
                                        <PostCard title={post.title} image={post.featuredImage} excerpt={post.excerpt} link={`/${title}/${post.slug}`} index={index} key={index} />
                                    ))}
                                    </div>
                                )}

                                {/* Load More Button */}
                                {hasNextPage && (
                                    <div className="w-full text-center mt-10">
                                        <button
                                            className="button fill sm"
                                            onClick={() => fetchSangrahPosts(after, title)}
                                            disabled={LoadMoreLoading}
                                        >
                                            {LoadMoreLoading ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle animate-spin inline-block mr-1">
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                                    </svg>
                                                    Loading
                                                </>
                                            ) : "Load More"}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // ✅ **Render Post Detail if fetchType is FALSE**
                            postDetail && (
                                <div className="p-4 border genral-content">
                                    {postDetail.featuredImage && (
                                        <img
                                            src={postDetail.featuredImage.node.mediaItemUrl}
                                            alt={postDetail.featuredImage.node.altText}
                                            className="w-full h-auto my-4"
                                        />
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
                                    {postDetail.sangrahFields?.videoUrl && (
                                        <div className="mt-4">
                                            <iframe
                                                width="100%"
                                                height="400"
                                                src={postDetail.sangrahFields.videoUrl}
                                                title={postDetail.title}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                    <PostCommentForm postId={postDetail.databaseId} />
                                </div>
                            )
                        )}
                    </div>

                    <div className="basis-[30%] pt-5">
                        <div className="sticky top-5">
                                <SangrahSidebar />
                            </div>
                    </div>
                </div>

                <div className="pb-[150px] sm:pb-[280px] lg:pb-[327px]"></div>
            </div>
        </>
    );
};

export default Page;
