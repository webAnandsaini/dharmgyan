'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageHeader from "../../compotents/PageHeader";
import DataLoader from "../../compotents/DataLoader";
import PostCard from "../../compotents/PostCard";
import sangrahSidebar from '../../compotents/sangrahSidebar';
import SangrahSidebar from "../../compotents/sangrahSidebar";

const Page = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [after, setAfter] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [LoadMoreLoading, setLoadMoreLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams();
    const { sangrah } = params;

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
                            excerpt
                            slug
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

    useEffect(() => {
        fetchSangrahPosts(null, sangrah);
    }, []);

    return (
        <>
            <div className="bg-[#FBDFA5]/20">
                <PageHeader title={sangrah} />
                <div className="container pt-5">
                    <div className="flex gap-8 relative">
                        <div className="basis-[70%]">
                            {error ? (
                                <p className="text-red-500">{error}</p>
                            ) : loading ? (
                                <DataLoader title={`Loading ${sangrah}`} />
                            ) : posts.length === 0 ? (
                                <p>No posts found.</p>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                        {posts.map((post, index) => (
                                            <PostCard title={post.title} image={post.featuredImage} excerpt={post.excerpt} link={`/${sangrah}/${post.slug}`} index={index} key={index} />
                                        ))}
                                    </div>

                                    {/* Load More Button */}
                                    {hasNextPage && (
                                        <div className="w-full text-center mt-10">
                                            <button
                                                className="button fill sm"
                                                onClick={() => fetchSangrahPosts(after, sangrah)}
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
                            )}
                        </div>

                        <div className="basis-[30%]">
                            <div className="sticky top-5">
                                <SangrahSidebar />
                            </div>
                        </div>
                    </div>

                    <div className="pb-[150px] sm:pb-[280px] lg:pb-[327px]"></div>
                </div>
            </div>
        </>
    );
};

export default Page;
