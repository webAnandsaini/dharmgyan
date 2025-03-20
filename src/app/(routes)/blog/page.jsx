'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SangrahSidebar from "../../compotents/sangrahSidebar";

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
        query GetAllPosts($first: Int!, $after: String) {
          posts(first: $first, after: $after) {
            nodes {
              title
              slug
              categories {
                nodes {
                  name
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
                variables: {
                    first: 5,
                    after: cursor,
                },
            }),
        });

        const { data } = await res.json();

        if (data?.posts) {
            setPosts((prev) => [...prev, ...data.posts.nodes]);
            setHasNextPage(data.posts.pageInfo.hasNextPage);
            setAfter(data.posts.pageInfo.endCursor);
        }
        setLoading(false);
    };


    // Fetch initial posts on mount
    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <>
            <div className="bg-red-extraDark py-6">
                <div className="container">
                    <h1 className="text-size-50 text-white">Bhajan</h1>
                </div>
            </div>
            <div className="container">
                <div className="flex gap-8">
                    <div className="basis-[70%]">
                        {posts.length === 0 && !loading ? (
                            <p>No posts found.</p>
                        ) : (
                            posts.map((post, index) => (
                                <div key={index} className="p-2 border mb-2 w-[600px]">
                                    <h2>{post.title}</h2>
                                    <h5>{"Category: " + post.categories.nodes[0]?.name}</h5>

                                    <Link href={`/blog/${post.categories.nodes[0]?.name}`}>
                                        View More in {post.categories.nodes[0]?.name}
                                    </Link>
                                    <br />


                                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                                </div>
                            ))
                        )}

                        {/* Load More Button */}
                        {hasNextPage && (
                            <button
                                className="mt-4 p-2 bg-blue-500 text-white rounded"
                                onClick={() => fetchPosts(after)}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                    <div className="basis-[30%]">
                    <div className="sticky top-5">
                                <SangrahSidebar />
                            </div>
                    </div>
                </div>
                <div className="div pb-[150px] sm:pb-[280px] lg:pb-[327px]">

                </div>
            </div>

        </>


    )
}

export default Page