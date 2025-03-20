'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PageHeader from '../../../compotents/PageHeader';
import DataLoader from "../../../compotents/DataLoader";
import Image from "next/image";

const PostDetail = () => {
    const params = useParams();
    const { title } = params;

    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostDetail = async (postSlug) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                    query deityDetails($postSlug: String!) {
                        deityBy(slug: $postSlug) {
                            title
                            featuredImage {
                                node {
                                    altText
                                    mediaItemUrl
                                }
                            }
                            deityDetails {
                                otherNames
                                introImage {
                                    node {
                                        altText
                                        mediaItemUrl
                                    }
                                }
                                abode
                                symbols
                                consort
                                siblings
                                parents
                                weapon
                                shastra
                                children
                            }
                            content
                        }
                    }`,
                    variables: { postSlug },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            const { data } = await res.json();
            setPostDetail(data?.deityBy);
        } catch (err) {
            console.error("Error fetching post detail:", err);
            setError("Failed to load post details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetail(title);
    }, [title]);

    return (
        <>
            <PageHeader title={postDetail?.title} />
            <div className="container mx-auto px-4 py-6">
                {loading ? (
                    <DataLoader title="Loading Post Details..." />
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    postDetail && (
                        <div className="flex gap-5">
                            {/* Left Column: Image */}
                            <div>
                                {postDetail.featuredImage && (
                                    <div className="aspect-[229/259] w-[229px] relative">
                                        <Image
                                            src={postDetail.featuredImage.node.mediaItemUrl}
                                            alt={postDetail.featuredImage.node.altText}
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Right Column: Details */}
                            <div className="grow-1">
                                <div className="md:grid md:grid-cols-12 md:gap-6 text-base">
                                    <div className="md:col-span-4 space-y-3">
                                        {postDetail.content && (<p className="mb-8"><strong>बारे में:</strong></p>)}
                                        {postDetail.content && (<p><strong>अन्य नाम:</strong> {postDetail.deityDetails.otherNames}</p>)}
                                        {postDetail.deityDetails.abode && (<p><strong>आवास:</strong> {postDetail.deityDetails.abode}</p>)}
                                        {postDetail.deityDetails.symbols && (<p><strong>प्रतीक:</strong> {postDetail.deityDetails.symbols}</p>)}
                                        {postDetail.deityDetails.consort  && (<p><strong>पति/पत्नी:</strong> {postDetail.deityDetails.consort}</p>)}
                                        {postDetail.deityDetails.siblings && (<p><strong>भाई-बहन:</strong> {postDetail.deityDetails.siblings}</p>)}
                                        {postDetail.deityDetails.parents && (<p><strong>माता-पिता:</strong> {postDetail.deityDetails.parents}</p>)}
                                        {postDetail.deityDetails.weapon && (<p><strong>शस्त्र:</strong> {postDetail.deityDetails.weapon}</p>)}
                                        {postDetail.deityDetails.shastra && (<p><strong>शास्त्र:</strong> {postDetail.deityDetails.shastra}</p>)}
                                        {postDetail.deityDetails.children && (<p><strong>संतान:</strong> {postDetail.deityDetails.children}</p>)}
                                    </div>
                                    <div className="md:col-span-8">
                                        {postDetail.content && (<p>{postDetail.content.toString().replace(/<[^>]*>/g, '')}</p>)}
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="div pb-[150px] sm:pb-[280px] lg:pb-[327px]">

            </div>
        </>
    );
};

export default PostDetail;
