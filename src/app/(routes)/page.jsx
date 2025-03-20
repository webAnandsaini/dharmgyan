'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import { formatDate } from "../compotents/CustomHooks";

// Import Images
import Hindu_temple from "../assets/images/Hindu-temple.png";
import mahatma from "../assets/images/mahatma.svg";
import module_bottom_dub from "../assets/images/module-bottom-dub.svg";
import Zodiac_Signs_bg from "../assets/images/Zodiac-Signs.svg";
import signIcon from "../assets/images/signIcon.svg";
import Chakra_Human from "../assets/images/chakra_Human_Body.svg";
import whyChooseGuru from "../assets/images/why_choose_guru.svg";
import facebook from "../assets/images/facebook.svg";
import leftArrow from "../assets/images/leftArrow.svg";
import RightArrowActive from "../assets/images/RightArrowActive.svg";
import HumanBgFrame from "../assets/images/HumanBgFrame.svg";

// will remove when dynamic data get
import shankarJi from "../assets/images/wp/shankarJi.jpg";
import SitaRam from "../assets/images/wp/SitaRam.jpg";
import Hanuman from "../assets/images/wp/hanuman.jpg";
import ganeshJi from "../assets/images/wp/ganeshJi.jpg";
import durgaMata from "../assets/images/wp/durgaMata.jpg";
import radhaKrishan from "../assets/images/wp/radhaKrishan.jpg";
import Zodiac_Signs_guru from "../assets/images/wp/Zodiac-Signs-guru.svg";
import prem_mandir from "../assets/images/wp/prem_mandir.jpg";
import testimonial_icon from "../assets/images/wp/testimonial_icon.svg";
import socialMediaBg from "../assets/images/wp/socialMediaBg.svg";
import axios from "axios";
import FullPageLoader from "../compotents/FullPageLoader";


export default function Home() {


  const dharmgyanUrl = process.env.NEXT_PUBLIC_DHARMGYAN_URL;
  const bhaktirasUrl = process.env.NEXT_PUBLIC_BHAKTIRAS_URL;

  const [dataLoader, setDataLoader] = useState(true);
  const [HomeBanner, setHomeBanner] = useState();
  const [Gods_GoddessesData, setGods_GoddessesData] = useState();
  const [Zodiac_Signs, setZodiac_Signs] = useState();
  const [templeList, setTempleList] = useState();
  const [blogs, setBlogs] = useState([]);

  const [sangrahList, setSangrahList] = useState();
  const [sangrahTabIndex, setSangrahTabIndex] = useState(undefined);
  const [finalSangrahList, setFinalSangrahList] = useState();


  const sangrahTabFun = () => {
    if (sangrahTabIndex === 0) {
      setFinalSangrahList(sangrahList?.bhajanList)
    } else if (sangrahTabIndex === 1) {
      setFinalSangrahList(sangrahList.chalishaList)
    } else if (sangrahTabIndex === 2) {
      setFinalSangrahList(sangrahList.aartiList)
    }
  }
  useEffect(() => {
    if (sangrahTabIndex != undefined) sangrahTabFun();

  }, [sangrahTabIndex])


  // const temples = [
  //   {
  //     title: "Prem Mandir",
  //     description: "It has survived not only five centuries, but also the leap into...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Akshardham Temple",
  //     description: "A symbol of spiritual and cultural harmony...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   {
  //     title: "Swayambhunath",
  //     description: "An ancient religious site atop a hill in Kathmandu...",
  //     image: "prem_mandir.jpg",
  //   },
  //   // Add more slides as needed
  // ];


  const swiperRef = useRef(null);
  const [swiperState, setSwiperState] = useState({
    isBeginning: true,
    isEnd: false,
  });




  const HomeBannerData = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${dharmgyanUrl}`,
        {
          query: `
            query HomeBanner {
              pages {
                nodes {
                  homePage {
                    bannerTitile
                    bannerExcerpt
                    bannerGuru {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    bannerLink {
                      title
                      url
                    }
                  }
                }
              }
            }
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setHomeBanner(response.data.data.pages.nodes[0].homePage)
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching home banner data:', error);
      return null;
    } finally {
      setDataLoader(false);
    }
  };

  const Gods_Goddesses = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${dharmgyanUrl}`,
        {
          query: `
              query Gods_Goddesses {
                              pages {
                                   nodes {
                                   homePage {
                               gods_Goddesses_list {
                                        name
                                        shortDescription
                                        image {
                                          node {
                                            altText
                                            mediaItemUrl
                                            sizes
                                          }
                                        }
                                }
                            }
                     }
                }
            }
            `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setGods_GoddessesData(response.data.data.pages.nodes[0].homePage.gods_Goddesses_list);

      }
      return response.data.data;
    }
    catch (err) {
      console.log(err);

    } finally {
      setDataLoader(false);
    }
  }


  const Zodiac_SignsSec = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${dharmgyanUrl}`,
        {
          query: `
              query Zodiac_Signs {
  zodiacSigns {
    nodes {
      title
      uri
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      postTypeZodiacSigns {
        rashi
      }
    }
  }
}
            `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setZodiac_Signs(response.data.data.zodiacSigns.nodes);

      }
      return response.data.data;
    }
    catch (err) {
      console.log(err);

    } finally {
      setDataLoader(false);
    }
  }

  const Temples = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${dharmgyanUrl}`,
        {
          query: `
              query Temples {
  pages {
    nodes {
      homePage {
        templeList {
          name
          shortDescription
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          detailUrl
        }
      }
    }
  }
}
            `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setTempleList(response.data.data.pages.nodes[0].homePage.templeList);

      }
      return response.data.data;
    }
    catch (err) {
      console.log(err);

    } finally {
      setDataLoader(false);
    }
  }


  const HomeSangrah = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${dharmgyanUrl}`,
        {
          query: `query HomeSangrah {
  pages {
    nodes {
      homePage {
        aartiList {
          title
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        bhajanList {
          title
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        chalishaList {
          title
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setSangrahList(response.data.data.pages.nodes[0].homePage);
        setSangrahTabIndex(0)
      }
      return response.data.data;
    }
    catch (err) {
      console.log(err);

    } finally {
      setDataLoader(false);
    }
  }

  const blogPosts = async () => {
    setDataLoader(true);
    try {
      const response = await axios.post(
        `${bhaktirasUrl}`,
        {
          query: `query blogPosts {
  posts(first: 4) {
    nodes {
      title
      postId
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      date
      excerpt
    }
  }
}
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setBlogs(response.data.data.posts.nodes);
      }
      return response.data.data;
    }
    catch (err) {
      console.log(err);

    } finally {
      setDataLoader(false);
    }
  }

  useEffect(() => {
    console.log(dharmgyanUrl);
    HomeBannerData();
    Gods_Goddesses();
    Zodiac_SignsSec();
    Temples();
    HomeSangrah();
    blogPosts();
  }, [])

  useEffect(() => {
    console.log(HomeBanner);
    console.log(Gods_GoddessesData);
    console.log(Zodiac_Signs);
    console.log(sangrahList);
    console.log(blogs);

  }, [HomeBanner, Gods_GoddessesData, Zodiac_Signs, sangrahList, blogs])



  return dataLoader ? (
    <FullPageLoader />
  ) : (
    <>
      <div className="main-banner bg-[url('assets/images/dharmgyam-banner-background.jpg')] h-[95vh] sm:h-screen relative flex justify-between items-end sm:min-h-[700px]">
        <div className="w-full max-w-2xl mx-auto text-center absolute left-1/2 top-[25%] sm:-translate-y-1/2 sm:top-1/2 -translate-x-1/2 pb-10 sm:pb-20 px-4 lg:px-0">
          <h1 className="text-h2 sm:text-6xl/[1.2] md:text-h1 font-Rowdies">{HomeBanner?.bannerTitile}</h1>
          <p className="pt-3.5 md:pt-5.5 pb-4 md:pb-8 text-grey">{HomeBanner?.bannerExcerpt}</p>
          {HomeBanner?.bannerLink?.url ? (<Link href={HomeBanner.bannerLink.url} className="button fill"> {HomeBanner.bannerLink.title ? HomeBanner.bannerLink.title : 'login'}</Link>) : ''}
        </div>

        <div className="relative z-10 max-md:w-full">
          <Image src={Hindu_temple} width={650} height={0} alt="temple" className="w-[340px] lg:w-[450px] xl:w-[550px] 2xl:w-[650px] max-md:mx-auto" />
        </div>
        <div>
          {HomeBanner?.bannerGuru.node.mediaItemUrl ? (<Image src={HomeBanner.bannerGuru.node.mediaItemUrl} width={740} height={0} alt={HomeBanner.bannerGuru.node.altText} className="max-md:hidden w-[340px] lg:w-[430px] xl:w-[550px] 2xl:w-[740px]" />) : ''}
        </div>
        <div className="section-footer absolute left-0 bottom-0 w-full">
          <Image src={module_bottom_dub} width={0} height={0} className="w-full h-auto" alt="bottom design" />
        </div>
      </div>

      {/* Gods and Goddesses */}
      <section className="Gods-Goddesses container">
        <div className="section-header pt-16 md:pt-25 pb-10 md:pb-[54px]">
          <div className="max-w-md">
            <h2>Gods and Goddesses</h2>
            <p>It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. </p>
          </div>
          <div>
            <Link href="#" className="button fill">View All</Link>
          </div>
        </div>
        <div className="gods-list">
          {/* <ul>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={shankarJi} width={210} height={0} alt="Shankar ji" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into  </p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={SitaRam} width={450} height={0} alt="SitaRam" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into </p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={Hanuman} width={450} height={0} alt="Hanuman ji" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into </p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={ganeshJi} width={210} height={0} alt="Ganesh ji" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into </p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={durgaMata} width={210} height={0} alt="Durga Mata" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into </p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                <Image src={radhaKrishan} width={450} height={0} alt="Radha Krishan" />
                <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                  <h3 className="font-signika">Shree Ram</h3>
                  <p className="font-signika font-light pt-0.5">It has survived not only five centuries, but also the leap into </p>
                </div>
              </a>
            </li>

          </ul> */}
          <ul>
            {Gods_GoddessesData?.map((gods, index) => (
              <li key={index}>
                <a href="#" className="relative block overflow-hidden rounded-2xl lg:rounded-23">
                  <Image src={gods.image.node.mediaItemUrl} width={210} height={0} alt={gods.image.node.altText} />
                  <div className="god-content pt-10 absolute opacity-0 bottom-0 translate-y-10 invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                    <h3 className="font-signika">{gods.name}</h3>
                    <p className="font-signika font-light pt-0.5">{gods.shortDescription}</p>
                  </div>
                </a>
              </li>
            ))
            }

          </ul>
        </div>

      </section>

      {/* DharamGyan Sangrah */}
      <section className="sangrah-section">
        <div className="container">
          <div className="section-header pt-16 md:pt-25 pb-10 md:pb-[54px]">
            <div className="max-w-md">
              <h2>Sangrah</h2>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>
            <div className="flex justify-end gap-3 items-center">
              <button onClick={() => setSangrahTabIndex(0)} className={`${sangrahTabIndex === 0 ? 'text-red-light' : ''}`}>Bhajan</button>
              <button onClick={() => setSangrahTabIndex(1)} className={`${sangrahTabIndex === 1 ? 'text-red-light' : ''}`}>Chalisha</button>
              <button onClick={() => setSangrahTabIndex(2)} className={`${sangrahTabIndex === 2 ? 'text-red-light' : ''}`}>Aarti</button>
            </div>
          </div>
          <div className="sangrah-list">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7">
              {
                finalSangrahList?.map((sangrahItem, index) => (
                  <div key={index} className="pt-6 pb-4 px-5 custom-shadow rounded-lg overflow-hidden relative">
                    <div className="aspect-[290/163] mb-2">
                      <Image src={sangrahItem.image?.node?.mediaItemUrl} width={290} height={163} alt={sangrahItem.image?.node?.altText} className="object-cover" />
                    </div>
                    <h3 className="text-h6 font-medium leading-none">{sangrahItem?.title}</h3>
                    <Link href={"#"} className="size-full absolute inset-0"></Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>



      {/* Zodiac Signs */}
      <section className="Zodiac_Sign bg-gradient-to-b to-[#FBDFA5]/50 from-[#928C7E]/0 relative after:content-normal after:absolute after:left-0 after:bottom-0 after:bg-[url('assets/images/green_sec_bottom.svg')] after:w-full after:h-28 xl:after:h-40">
        <div className="container">
          <div className="section-header pt-25 pb-[54px] mt-16">
            <div className="max-w-md">
              <h2>Zodiac Signs</h2>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>
            <div>
              <Link href="#" className="button fill">View All</Link>
            </div>
          </div>

          <div className="md:flex flex-wrap justify-between items-end">
            <div className="signs-list flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-12 col-span-8 basis-[62%] md:pt-13 pb-10 md:pb-40 xl:pb-60 h-fit relative z-10">
              {Zodiac_Signs?.map((Zodiac_Sign, index) => (
                <div key={index} className="sign  text-white text-center relative z-[-1]" >
                  <Image src={Zodiac_Signs_bg} width={123} height={63} alt="Zodiac Signs" className=" inset-0 z-[-1]" />
                  <div className="bg-brown pb-4 min-w-[123px] relative pt-6 px-2">
                    <Image src={Zodiac_Sign.featuredImage.node.mediaItemUrl} width={57} height={57} className="mx-auto absolute left-1/2 -translate-x-1/2 -top-10" alt={Zodiac_Sign.featuredImage.node.altText} />
                    <p className="font-signika text-sm">{Zodiac_Sign.title} <br />
                      ({Zodiac_Sign.postTypeZodiacSigns.rashi})</p>
                  </div>
                  <Link href={Zodiac_Sign.uri} className="absolute size-full inset-0"></Link>
                </div>
              ))}
            </div>
            <div className="col-span-4 basis-[38%]">
              <Image src={Zodiac_Signs_guru} width={100} height={200} className="size-auto mx-auto" alt="Zodic Sign Guru" />
            </div>
          </div>
        </div>
      </section>

      {/*Dharmgyan (Blogs) */}
      <section className="pb-16 md:pb-25 bg-gradient-to-b from-[#5AA30A]/[31%] to-[#928C7E]/0">
        <div className="container">
          <div className="section-header pt-16 md:pt-25 pb-10 md:pb-[54px]">
            <div className="max-w-md">
              <h2>Gods and Goddesses</h2>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>
            <div>
              <Link href="#" className="button fill">View All</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5">
            {
              blogs[0] ? (
                <div className="hidden md:block">
                  <Image src={blogs[0].featuredImage ? blogs[0].featuredImage.node.mediaItemUrl : 'https://dummyimage.com/690x377/b4b6b7/fff.png'} width={690} height={0} alt={blogs[0]?.featuredImage?.node?.altText || blogs[0]?.title} className="rounded-lg" />
                  <div className="content pt-3.5">
                    <span className="text-sm">{formatDate(blogs[0]?.date)}</span>
                    <h3 className="text-size-25/9 line-clamp-2">{blogs[0]?.title}</h3>
                    {/* <div className="mb-4.5"><p className="line-clamp-3" dangerouslySetInnerHTML>{blogs[0]?.excerpt}</p></div> */}
                    <div className="mb-4.5" dangerouslySetInnerHTML={{__html: `<p className="line-clamp-3" dangerouslySetInnerHTML>${blogs[0]?.excerpt}</p>`}}></div>

                    <Link href={`/blog/${blogs[0]?.postId}`} className="button sm">Learn more</Link>
                  </div>
                </div>
              ) : ''
            }


            <div className="posts-lists md:space-y-7.5 max-md:flex flex-nowrap gap-5 overflow-x-visible overflow-y-hidden md:overflow-hidden">
              {
                blogs?.map((blog, index) => (
                  <div key={blog?.postId} className={`max-md:min-w-[354px] post flex gap-7.5 flex-col lg:flex-row lg:flex-nowrap lg:items-center md:first:hidden ${ index ===1 ? 'md:!mt-0' : ''}`}>
                    <div className="aspect-[289/170] basis-[45%] h-fit max-w-[289px] rounded-md overflow-hidden">
                      <Image src={blog.featuredImage ? blog.featuredImage.node.mediaItemUrl : 'https://dummyimage.com/289x170/b4b6b7/fff.png'} width={289} height={170} alt={blog?.featuredImage?.node?.altText || blog?.title} className="size-full object-cover" />
                    </div>
                    <div className="content basis-[55%] ">
                      <span className="text-sm">{formatDate(blog?.date)}</span>
                      <h3 className="text-xl sm:text-size-25/9 line-clamp-2">{blog?.title}</h3>
                      <div className="mb-3"><p>{blog?.id}</p></div>
                      <Link href={`/blog/${blog?.postId}`} className="button sm">Learn more</Link>
                    </div>
                  </div>
                ))
              }


              {/* <div className="max-md:min-w-[354px] post flex gap-7.5 flex-col lg:flex-row lg:flex-nowrap lg:items-center">
                <div className="aspect-[289/170] basis-[45%] h-fit max-w-[289px] rounded-md overflow-hidden">
                  <Image src={Hanuman} width={289} height={0} alt="Hanuman ji" className="size-full object-cover" />
                </div>
                <div className="content basis-[55%] ">
                  <span className="text-sm">Wed, 10 Jul 2024 04:46 PM </span>
                  <h3 className="text-size-25/9">Lorem ipsum dolor</h3>
                  <div className="mb-3"><p>Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p></div>
                  <Link href={'/blog/details'} className="button sm">Learn more</Link>
                </div>
              </div>
              <div className="max-md:min-w-[354px] post flex gap-7.5 flex-col lg:flex-row lg:flex-nowrap lg:items-center">
                <div className="aspect-[289/170] basis-[45%] h-fit max-w-[289px] rounded-md overflow-hidden">
                  <Image src={Hanuman} width={289} height={0} alt="Hanuman ji" className="size-full object-cover" />
                </div>
                <div className="content basis-[55%] ">
                  <span className="text-sm">Wed, 10 Jul 2024 04:46 PM </span>
                  <h3 className="text-size-25/9">Lorem ipsum dolor</h3>
                  <div className="mb-3"><p>Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p></div>
                  <Link href={'/blog/details'} className="button sm">Learn more</Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Chakars section */}
      <section className="pt-16 md:pt-25 bg-[url('assets/images/ChakraBackground2.svg')] bg-cover text-white pb-20 sm:pb-28 md:pb-[172px]">
        <div className="container">
          <h2 className="text-center text-h4 md:text-h2 ">7 Chakras in Human Body</h2>
          <div className="pt-25 sm:pt-[158px] md:pt-[219px] relative">
            <Image src={HumanBgFrame} width={538} height={538} alt="Chakra Bg Frame" className="absolute left-1/2 -ml-[135px] sm:-ml-[219px] md:-ml-[262px] size-[300px] sm:size-[438px] md:size-[538px] top-0 animate-[spin_15s_linear_infinite]" />
            <Image src={Chakra_Human} width={451} height={0} alt="Chakra on Human Body" className="mx-auto w-[330px] sm:w-[451px] relative z-10" />

            <div className="chakra-lists text-white w-full max-w-[330px] sm:max-w-[1246px] mx-auto absolute top-[108px] sm:top-[164px] md:top-[229px] inset-0 flex flex-col gap-y-4 sm:gap-y-10 z-10">
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Crown Chakra</span>
                  <div className="line bg-[#E941E3] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#E941E3] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Sahasrara</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center mt-3">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Third Eye Chakra</span>
                  <div className="line bg-[#7F7DC0] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#7F7DC0] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Ajna</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center mt-3.5 sm:mt-2.5">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Throat Chakra</span>
                  <div className="line bg-[#8EFFFF] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#8EFFFF] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Vishuddha</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center mt-4 sm:mt-1">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Heart Chakra</span>
                  <div className="line bg-[#86FF3E] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#86FF3E] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Anahata</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center mt-2 sm:mt-3">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Solar Plexus Chakra</span>
                  <div className="line bg-[#FFFF93] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#FFFF93] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Manipura</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center max-sm:-mt-1">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Sacral Chakra</span>
                  <div className="line bg-[#FEC20E] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#FEC20E] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Svadhisthana</span>
                </div>
              </div>
              <div className="flex justify-between gap-x-16 sm:gap-x-[173px] items-center max-sm:mt-2">
                <div className="basis-1/2 flex items-center gap-3.5">
                  <span className="w-fit text-base sm:text-lg">Root Chakra</span>
                  <div className="line bg-[#FC4083] h-0.5 grow"></div>
                </div>
                <div className="basis-1/2 flex items-center gap-3.5">
                  <div className="line bg-[#FC4083] h-0.5 grow"></div>
                  <span className="w-fit text-base sm:text-lg">Muladhara</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temples section */}
      <section className="temple-section">
        <div className="container">
          <div className="section-header pt-25 pb-[54px]">
            <div className="max-w-md">
              <h2>Gods and Goddesses</h2>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>
            <div>
              <Link href="#" className="button fill">View All</Link>
            </div>
          </div>

          <div className="temple-slider ">
            <Swiper
              grabCursor={true}
              slidesPerView="auto"
              loop={true}
              spaceBetween={30}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className=""
            >
              {templeList?.map((temple, index) => (
                <SwiperSlide key={index} className="!w-[300px] md:!w-[210px] !h-[500px] md:!h-[542px]">
                  <div className="relative overflow-hidden !rounded-md shadow-lg w-full h-full text-white">
                    <Image
                      src={temple.image.node.mediaItemUrl}
                      alt={temple.name}
                      width={450}
                      height={0}
                      className="w-full h-full object-cover"
                    />
                    {/* <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-4 temple-content hidden w-full">
                      <h3 className="text-lg font-bold">{temple.title}</h3>
                      <p className="text-sm">{temple.description}</p>
                    </div> */}
                    <div className="temple-content pt-10 absolute md:opacity-0 bottom-0 md:translate-y-10 md:invisible transition-all duration-300 text-left flex flex-col justify-end pl-[6%] pr-[10%] pb-6 hover-bg-gradient w-full">
                      <h3 className="font-signika">{temple.name}</h3>
                      <p className="font-signika font-light pt-0.5">{temple.shortDescription}</p>
                    </div>
                    <Link href={temple.detailUrl} className="absolute size-full inset-0"></Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[url('assets/images/whyChoose_BG.svg')] bg-no-repeat bg-cover pb-[150px] sm:pb-[280px] lg:pb-[327px]">
        <div className="container">
          <div className="section-header pt-25 pb-[54px]">
            <div className="max-w-md">
              <h2>Gods and Goddesses</h2>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>
            <div>
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={swiperState?.isBeginning}
              >
                <Image
                  src={leftArrow}
                  width={35}
                  height={0}
                  alt="Choose Guru"
                  className={swiperState?.isBeginning ? '' : 'hidden'}
                />
                <Image
                  src={RightArrowActive}
                  width={75}
                  height={0}
                  alt="Choose Guru"
                  className={swiperState?.isBeginning ? 'hidden' : 'rotate-180'}
                />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={swiperState?.isEnd}
                className="ml-4"
              >
                <Image
                  src={RightArrowActive}
                  width={75}
                  height={0}
                  alt="Choose Guru"
                  className={swiperState?.isEnd ? 'hidden' : ''}
                />
                <Image
                  src={leftArrow}
                  width={35}
                  height={0}
                  alt="Choose Guru"
                  className={swiperState?.isEnd ? 'rotate-180' : 'hidden'}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="max-sm:order-2 col-span-12 sm:col-span-5">
              <Image src={whyChooseGuru} width={571} height={0} alt="Choose Guru" />
            </div>
            <div className="col-span-12 sm:col-span-7">
              <div className="dharmgyan-slider">
                <Swiper
                  grabCursor={true}
                  // slidesPerView="2"
                  // loop={true}
                  spaceBetween={0}
                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setSwiperState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                  onSwiper={(swiper) => {
                    setSwiperState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                  breakpoints={{
                    576: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}

                  className=""
                >
                  <SwiperSlide key={2} className="p-3 sm:p-6">
                    <div className="bg-white custom-shadow px-7.5 pt-[73px] pb-12 w-full rounded-md flex flex-col justify-center items-center">
                      <Image src={testimonial_icon} width={104} height={0} alt="Choose Guru" className="w-16 md:w-[104px]" />
                      <span className="block mt-[34px] text-4xl sm:text-5xl md:text-6xl">5000+</span>
                      <div className="text-center my-6 md:my-10 max-w-64">
                        <p className="text-xl mb-4">Bhajan</p>
                        <p>but also the leap into
                          electronic typesetting, remaining essentially unchanged.</p>
                      </div>
                      <Link href="#" className="button">Learn more</Link>
                    </div></SwiperSlide>
                  <SwiperSlide key={2} className="p-3 sm:p-6">
                    <div className="bg-white custom-shadow px-7.5 pt-[73px] pb-12 w-full rounded-md flex flex-col justify-center items-center">
                      <Image src={testimonial_icon} width={104} height={0} alt="Choose Guru" className="w-16 md:w-[104px]" />
                      <span className="block mt-[34px] text-4xl sm:text-5xl md:text-6xl">5000+</span>
                      <div className="text-center my-6 md:my-10 max-w-64">
                        <p className="text-xl mb-4">Bhajan</p>
                        <p>but also the leap into
                          electronic typesetting, remaining essentially unchanged.</p>
                      </div>
                      <Link href="#" className="button">Learn more</Link>
                    </div></SwiperSlide>
                  <SwiperSlide key={2} className="p-3 sm:p-6">
                    <div className="bg-white custom-shadow px-7.5 pt-[73px] pb-12 w-full rounded-md flex flex-col justify-center items-center">
                      <Image src={testimonial_icon} width={104} height={0} alt="Choose Guru" className="w-16 md:w-[104px]" />
                      <span className="block mt-[34px] text-4xl sm:text-5xl md:text-6xl">5000+</span>
                      <div className="text-center my-6 md:my-10 max-w-64">
                        <p className="text-xl mb-4">Bhajan</p>
                        <p>but also the leap into
                          electronic typesetting, remaining essentially unchanged.</p>
                      </div>
                      <Link href="#" className="button">Learn more</Link>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>


          <div className="social-media mt-16 md:mt-25">
            <div className="max-w-[520px] mx-auto text-center">
              <h3 className="text-h2 mb-3">Follow us on social media</h3>
              <p>It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-7 mt-13">
              <div className="relative rounded-xl overflow-hidden">
                <Image src={socialMediaBg} width={332} height={0} alt="Choose Guru" className="w-full" />
                <div className="overlay bg-black/25 absolute w-full h-full inset-0"></div>
                <Link href="#" className="size-full absolute inset-0"><Image src={facebook} width={73} height={73} alt="Choose Guru" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </Link>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image src={socialMediaBg} width={332} height={0} alt="Choose Guru" className="w-full" />
                <div className="overlay bg-black/25 absolute w-full h-full inset-0"></div>
                <Link href="#" className="size-full absolute inset-0"><Image src={facebook} width={73} height={73} alt="Choose Guru" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </Link>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image src={socialMediaBg} width={332} height={0} alt="Choose Guru" className="w-full" />
                <div className="overlay bg-black/25 absolute w-full h-full inset-0"></div>
                <Link href="#" className="size-full absolute inset-0"><Image src={facebook} width={73} height={73} alt="Choose Guru" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </Link>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image src={socialMediaBg} width={332} height={0} alt="Choose Guru" className="w-full" />
                <div className="overlay bg-black/25 absolute w-full h-full inset-0"></div>
                <Link href="#" className="size-full absolute inset-0"><Image src={facebook} width={73} height={73} alt="Choose Guru" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}
