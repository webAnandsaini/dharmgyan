'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "../../compotents/PageHeader";
import Image from "next/image";

const Page = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [after, setAfter] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);


    // Function to fetch posts
    const fetchPosts = async (cursor = null) => {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                 query Mandirs($first: Int!, $after: String) {
            places(first: $first, after: $after)  {
              nodes {
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
                placeExtraDetails {
                  introImage {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
                title
                slug
                uri
                content
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
                `,
                variables: {
                    first: 9,
                    after: cursor,
                },
            }),
        });

        const { data } = await res.json();

        if (data?.places) {
            setPosts((prev) => [...prev, ...data.places.nodes]);
            setHasNextPage(data.places.pageInfo.hasNextPage);
            setAfter(data.places.pageInfo.endCursor);
        }
        setLoading(false);
    };


    // Fetch initial posts on mount
    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <>
            <PageHeader title={'Mandirs'} />
            <div className="container">
                <div className="mt-6">

                    {posts.length === 0 && !loading ? (
                        <p>No posts found.</p>
                    ) : (
                        <div className="grid grid-cols-6 gap-x-4 gap-y-10">
                            {posts.map((post, index) => (
                                <div key={index} className="overflow-hidden rounded-lg relative place-items-stretch border-t-0 border rounded-b-lg group">
                                    <Link href={`mandirs/${post.slug}`} className="absolute size-full z-10"></Link>
                                    <div className="aspect-[229/259] w-full overflow-hidden relative">
                                        <Image
                                            src={post.featuredImage ? post?.featuredImage.node?.mediaItemUrl : 'https://dummyimage.com/229x259/b4b6b7/fff.png'}
                                            fill
                                            alt={post?.featuredImage?.node?.altText || post.title}
                                            className={`object-cover size-full group-hover:scale-105 transition-all duration-1000`}
                                        />
                                    </div>
                                    <div className="py-2.5 px-2">
                                        <h2 className="text-red-extraDark">{post.title}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}

                    {/* Load More Button */}
                    {hasNextPage && (
                        <div className="w-full text-center mt-10">
                            <button
                                className="button fill sm"
                                onClick={() => fetchPosts(after)}
                                disabled={loading}
                            >
                                {loading ? (
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

                </div>
                <div className="div pb-[150px] sm:pb-[280px] lg:pb-[327px]">

                </div>
            </div>

        </>


    )
}

export default Page