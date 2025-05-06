'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/Cards/ArticleCard'
import { FaFacebook, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import ShareButton from '@/components/Articles/ShareButton'
import { getSessionData } from '@/components/utils/deviceId'
import { notFound, useParams } from 'next/navigation'
import api from '@/Services/Apiservice'
import { useRouter } from 'next/navigation'
import ArticleCard2 from '@/components/Cards/ArticleCard2'
import GallerySlider from '@/components/JobDetail/Slider/GallarySlider'
import { formatArticleDate, formatArticleDate2 } from '@/components/utils'

export default function page() {
    const { slug } = useParams() || '1';
    const router = useRouter();
    const [article, setArticle] = useState<ArticleDetail>();
    const [fetauredArticles, setFetauredArticles] = useState<null | ArticleCard[]>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchArticle() {
            // Safely extract the ID from slug (which could be string or string[])
            const slugString = Array.isArray(slug) ? slug[0] : slug || '';
            const articleId = slugString.split('-')[0] || '0';
            
            try {
            let payload = {
                id: articleId || '0',
            };
            const { deviceId, secret, salt } = getSessionData();
            // Ensure session data is available
            if (!deviceId || !secret || !salt) {
                // console.log("Session data not available, retrying...");
                setTimeout(fetchArticle, 1000); // Retry after 1 second
                return;
            }
            const formData = new FormData();
            // ✅ Automatically append all fields from the object
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value  as any); // Convert all values to strings
            });
            const response = await api.post("Auth/getArticleDetail", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            const responseData = response.data as ArticleDetailResponse;
            if (responseData.code === 1) {
                setArticle(responseData?.result?.article);
                setFetauredArticles(responseData?.result?.featured_articles)
            }
            } catch (error: any) {
            if (error?.status == 404) {
                notFound();
            }
            // console.log(error);
            }
            setIsLoading(false);
        }
        fetchArticle();
        }, []);

        if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
            </div>
        );
        }
    const slides = fetauredArticles?.map((job, index) => (
        <ArticleCard2 key={index} {...job} />
    ))
    return (
        <main className='bg-white'>
            <div className="image-wrapper h-[400px] md:h-[600px] max-h-[60vh] 3xl:h-[807px] w-full relative">
                <Image
                    src={article?.cover_photo || ""}
                    fill
                    className='object-cover '
                    alt='Jobs: Unlocking Women’s Economic Potential and Boosting Economies '
                />
                <div style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.66) 70.73%)'
                }} className="image-overlay absolute z-[1] bottom-0 left-0 h-[400px] md:h-[600px] flex items-end max-h-[60vh] 3xl:h-[807px] w-full">
                    <div className="author-tag mb-[22px] md:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-[34px] container bottom-[22px] xl:bottom-6  3xl:bottom-7 3xl:left-7 xl:left-6 left-10">
                        <h1 className='text-[26px] text-white leading-[33px] lg:text-3xl xl:text-4xl 3xl:text-[50px] 3xl:leading-[65px] font-medium xl:max-w-[800px] 3xl:max-w-[1000px] uppercase'>{article?.title || ""}</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="author-image relative size-9 md:size-10 xl:size-11 3xl:size-[46px] rounded-full border">
                                <Image
                                    src={article?.cover_photo || ""}
                                    fill
                                    className='rounded-full'
                                    alt={article?.title || ""}
                                />
                            </div>
                            <div className="author-info">
                                <div className="author-name capitalize text-white font-medium text-sm 3xl:text-base leading-[100%]">By {article?.name || "Anonymus User"}</div>
                                <div className="publish-date text-white text-[10px] 3xl:text-xs leading-[100%] mt-1">{article?.posted_date && formatArticleDate2(article?.posted_date)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='container py-[18px] sm:py-11 md:py-12 xl:py-14 3xl:py-[67px]'>
                <div className="relative">
                    <ShareButton/>
                    <div className="content w-[95%] md:w-full" dangerouslySetInnerHTML={{ __html: article?.description }} />
                </div>
            </section>

            <section className='section-shadow'>
                <div className="container py-11 md:py-12 xl:py-14 3xl:py-[67px]">
                    <h2 className='text-[22px] leading-[24px] md:text-2xl xl:text-3xl 3xl:text-[34px] font-medium mb-4 md:mb-6 xl:mb-8 3xl:mb-10'>Related articles </h2>                       
                    <div className="featured-articles">
                        <GallerySlider
                        slides={slides as any}
                        spaceBetween={25}
                        showNavigation
                        loop={true}
                        autoplay={true}
                        autoplayDuration={3000}
                        freeMode={false}
                        arrowOut
                        slidesPerView={1}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.3,
                            },
                            768: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
                            },
                            1500: {
                                slidesPerView: 3,
                            },
                            }}
                        />
                    </div>
                </div>
            </section>
        </main>

    )
}

