import Link from "next/link";
import React, { useState, useEffect } from "react";

const SangrahSidebar = () => {
    const [latestSangrah, setLatestSangrah] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSangrahLatestPosts();
    }, []);

    const fetchSangrahLatestPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `query GetAllSangrah($first: Int!) {
                        allSangrah(first: $first) {
                            nodes {
                                title
                                slug
                            }
                        }
                    }`,
                    variables: {
                        first: 10, // Fetching the latest 10 posts
                    },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            const { data } = await res.json();

            if (data?.allSangrah?.nodes) {
                setLatestSangrah(data.allSangrah.nodes);
            } else {
                setError("No posts found.");
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-yellow-100 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Latest Sangrah</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <ul className="pl-5 space-y-2">
                    {latestSangrah.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/sangrah/${post.slug}`} className="text-blue-600 hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SangrahSidebar;
