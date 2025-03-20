'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DataLoader from "../../../compotents/DataLoader";

import module_bottom_dub from "../../../assets/images/module-bottom-dub.svg";

const MandirDetail = () => {
    const params = useParams();
    const { title } = params;
    const [templeData, setTempleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTempleDetails = async (slug) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BHAKTIRAS_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                    query MandirDetail($slug: String!) {
                        placeBy(slug: $slug) {
                            title
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    placeExtraDetails {
      architecture
      basicServices
      builtAround
      city
      darshanTimings
      deity
      districts
      facebook
      founded
      founder
      freeEntry
      howToReach
      introImage {
        node {
          altText
          mediaItemUrl
        }
      }
      mainAttraction
      organizedBy
      phoneNumber
      photoGallery {
        nodes {
          altText
          mediaItemUrl
        }
      }
      photography
      placeAddress
      state
      videoGallery {
        videoUrl
      }
      websiteUrl
      whatsapp
      youtube
      google
      email
    }
                        }
                    }`,
                    variables: { slug },
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            const { data } = await res.json();
            setTempleData(data?.placeBy);
        } catch (err) {
            console.error('Error fetching temple details:', err);
            setError('Failed to load temple details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTempleDetails(title);
    }, [title]);

    return (
        <>
            {loading ? (
                <DataLoader title='Loading Temple Details...' />
            ) : error ? (
                <p className='text-red-500'>{error}</p>
            ) : (
                templeData && (
                    <div>
                        {/* Banner Section */}
                        <div
                            className="relative bg-cover bg-center h-[390px] flex items-center justify-center text-white text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:bg-[url('assets/images/redBorderBg.svg')] after:w-full after:h-28 xl:after:h-20"
                             style={{ backgroundImage: `url(${templeData.featuredImage?.node?.mediaItemUrl})` }}
                        >
                            <div className='absolute inset-0 bg-black bg-opacity-60'></div>
                            <div className="container flex gap-10 relative">
                                <div className="">
                                    {templeData.placeExtraDetails.introImage && (
                                        <div className='aspect-[229/259] w-[229px] relative'>
                                            <Image
                                                src={templeData.placeExtraDetails.introImage.node.mediaItemUrl}
                                                alt={templeData.placeExtraDetails.introImage.node.altText || templeData.title}
                                                className='object-cover rounded-md'
                                                layout='fill'
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className='pt-3'>
                                    <h1 className='text-h2'>{templeData.title}</h1>
                                    <p className='mt-4 text-h6 font-normal max-w-2xl'>{templeData.placeExtraDetails.placeAddress  &&  templeData.placeExtraDetails.placeAddress + ','} {templeData.placeExtraDetails.city  &&  templeData.placeExtraDetails.city + ','} {templeData.placeExtraDetails.state}</p>
                                </div>
                            </div>
                            <div className="section-footer absolute left-0 bottom-0 w-full">
                                <Image src={module_bottom_dub} width={0} height={0} className="w-full h-auto" alt="bottom design" />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className='container mx-auto px-4 py-6'>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <p><strong>आरती समय:</strong> {templeData.placeExtraDetails.darshanTimings || 'जानकारी उपलब्ध नहीं'}</p>
                                    <p><strong>मूर्ति:</strong> {templeData.placeExtraDetails.deity || 'जानकारी उपलब्ध नहीं'}</p>
                                    <p><strong>निर्माण काल:</strong> {templeData.placeExtraDetails.builtAround || 'जानकारी उपलब्ध नहीं'}</p>
                                    <p><strong>नि:शुल्क प्रवेश:</strong> {templeData.placeExtraDetails.freeEntry ? 'हाँ' : 'नहीं'}</p>
                                    <p><strong>फोन नंबर:</strong> {templeData.placeExtraDetails.phoneNumber || 'जानकारी उपलब्ध नहीं'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Photo Gallery */}
                        <div className='container mx-auto px-4 py-6'>
                            <h2 className='text-2xl font-bold mb-4'>फोटो गैलरी</h2>
                            <div className='flex overflow-x-auto space-x-4'>
                                {templeData.placeExtraDetails.photoGallery?.nodes.map((photo, index) => (
                                    <div key={index} className='w-[150px] h-[100px] relative'>
                                        <Image
                                            src={photo.mediaItemUrl}
                                            alt={photo.altText}
                                            className='object-cover rounded-md'
                                            layout='fill'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className='container mx-auto px-4 py-6'>
                            <h2 className='text-2xl font-bold mb-4'>कैसे पहुंचे</h2>
                            {templeData.placeExtraDetails.google ? (
                                <iframe
                                    src={templeData.placeExtraDetails.google}
                                    width='100%'
                                    height='400'
                                    className='rounded-lg border'
                                    allowFullScreen=''
                                    loading='lazy'
                                ></iframe>
                            ) : (
                                <p>डेटा उपलब्ध नहीं है</p>
                            )}
                        </div>
                    </div>
                )
            )}
            <div className="div pb-[150px] sm:pb-[280px] lg:pb-[327px]"></div>
        </>
    );
};

export default MandirDetail;
