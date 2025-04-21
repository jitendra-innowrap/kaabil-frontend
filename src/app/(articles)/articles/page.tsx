'use client'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/Cards/ArticleCard'
import ArticleCard2 from '@/components/Cards/ArticleCard2'
import { showToast } from '@/components/utils'
import { getSessionData } from '@/components/utils/deviceId'
import api from '@/Services/Apiservice'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const { page } = useParams() || '1';
    const router = useRouter();
    const [articles, setArticles] = useState<null | ArticleCard[]>(null);
    const [total, setTotal] = useState<null | number>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [coverArticle, setCoverArticle] = useState<null | ArticleCard>(null);
    useEffect(() => {
        async function fetchArticles() {
          try {
            let payload = {
              page: page || '1',
            };
            const { deviceId, secret, salt } = getSessionData();
            // Ensure session data is available
            if (!deviceId || !secret || !salt) {
              // console.log("Session data not available, retrying...");
              setTimeout(fetchArticles, 1000); // Retry after 1 second
              return;
            }
            const formData = new FormData();
            // ✅ Automatically append all fields from the object
            Object.entries(payload).forEach(([key, value]) => {
              formData.append(key, value  as string); // Convert all values to strings
            });
            const response = await api.post("Auth/articleList", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            const responseData = response.data as ArticleResponse;
            if (responseData.code === 1) {
                setCoverArticle(responseData?.result?.articles?.[0]);
                setArticles(responseData?.result?.articles);
                setTotal(responseData?.result?.total_articles);
            }
          } catch (error: any) {
            if (error?.status == 404) {
              notFound();
            }
            console.log(error);
          }
          setIsLoading(false);
        }
        fetchArticles();
      }, []);

    if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
        </div>
    );
    }
    return (
        <main className='container no-mobile-container'>
            <div className='mobile-container'>
                <div className="mt-5 3xl:mt-6 mb-7 3xl:mb-8">
                    <Breadcrumb root='Home' category='Articles' />
                </div>
                <section className=''>
                    <h1 className='text-[26px] leading-[33px] lg:text-3xl xl:text-4xl 3xl:text-[50px] 3xl:leading-[65px] font-medium text-black'>{coverArticle?.title} </h1>
                    <p className='text-sm lg:text-base xl:text-xl 3xl:text-[22px] 3xl:leading-[36px] tracking-[-2%] mt-2  mb-4 md:mb-6 xl:mb-7'>{coverArticle?.short_description}</p>
                </section>
            </div>
            <div className="image-wrapper lg:rounded-3xl h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full relative">
                <Image
                    src={coverArticle?.cover_photo || ""}
                    fill
                    className='object-cover lg:rounded-3xl '
                    alt={coverArticle?.title || ""}
                />
                <div style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.58) 89.42%)'
                }} className="image-overlay lg:rounded-3xl absolute z-[1] bottom-0 left-0 h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full">
                    <div className="author-tag gap-3 absolute bottom-[22px] xl:bottom-6  3xl:bottom-7 3xl:left-7 xl:left-6 left-10  flex items-center">
                        <div className="author-image relative size-9 md:size-10 xl:size-11 3xl:size-[46px] rounded-full border">
                            <Image
                                src={coverArticle?.user_photo || ""}
                                fill
                                className='rounded-full'
                                alt={coverArticle?.name || ""}
                            />
                        </div>
                        <div className="author-info">
                            <div className="author-name text-white font-medium text-sm 3xl:text-base leading-[100%]">By {coverArticle?.name || ""}</div>
                            <div className="publish-date text-white text-[10px] 3xl:text-xs leading-[100%] mt-1">{coverArticle?.posted_date || ""}</div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='mobile-container py-11 md:py-12 xl:py-14 3xl:py-[67px]'>
                <h2 className='text-[22px] leading-[24px] md:text-2xl xl:text-3xl 3xl:text-[34px] font-medium mb-4 md:mb-6 xl:mb-8 3xl:mb-10'>Featured articles</h2>
                <div className="grid flex-col sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {articles?.map((job, index) => (
                        <ArticleCard2 key={index} {...job} />
                    ))}
                </div>
                <div className="flex w-full justify-center mt-8 lg:mt-10 xl:mt-12 3xl:mt-[55px]">
                    <button className='btn-border font-medium w-[160px] 3xl:w-[189px] 3xl:h-[50px] text-red !border-red'>Load More</button>
                </div>
            </section>
        </main>

    )
}

