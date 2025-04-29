'use client'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/Cards/ArticleCard'
import ArticleCard2 from '@/components/Cards/ArticleCard2'
import { formatArticleDate, formatArticleDate2, showToast } from '@/components/utils'
import { getSessionData } from '@/components/utils/deviceId'
import api from '@/Services/Apiservice'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ArticlesPage() {
    const { page } = useParams() || '1';
    const router = useRouter();
    const [articles, setArticles] = useState<ArticleCard[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [coverArticle, setCoverArticle] = useState<null | ArticleCard>(null);

    const fetchArticles = async (pageNum: number = 1, isLoadMore: boolean = false) => {
        try {
            isLoadMore ? setIsLoadingMore(true) : setIsLoading(true);
            
            let payload = {
                page: pageNum.toString(),
            };
            
            const { deviceId, secret, salt } = getSessionData();
            if (!deviceId || !secret || !salt) {
                setTimeout(() => fetchArticles(pageNum, isLoadMore), 1000);
                return;
            }

            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            const response = await api.post("Auth/articleList", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const responseData = response.data as ArticleResponse;
            if (responseData.code === 1) {
                if (pageNum === 1) {
                    // Set the first article as cover and the rest as regular articles
                    const allArticles = responseData?.result?.articles || [];
                    const [coverArticle, ...remainingArticles] = allArticles;

                    setCoverArticle(coverArticle);
                    setArticles(remainingArticles);
                } else {
                    setArticles(prev => [...prev, ...(responseData?.result?.articles || [])]);
                }
                setTotalPages(Math.ceil(responseData?.result?.total_articles / 12)); // Assuming 12 items per page
            }
        } catch (error: any) {
            if (error?.status == 404) {
                notFound();
            }
            console.log(error);
            showToast(error?.message || "Failed to load articles", true);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchArticles(1);
    }, []);

    const loadMoreArticles = () => {
        if (currentPage < totalPages && !isLoadingMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchArticles(nextPage, true);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
            </div>
        );
    }

    return (
        <main className='bg-white'>
            <div className='container no-mobile-container'>
                <div className=''>
                    <div className="mobile-container pt-5 3xl:pt-6 mb-7 3xl:mb-8">
                        <Breadcrumb root='Home' category='Articles' />
                    </div>
                    {coverArticle && (
                        <>
                            <section className='mobile-container'>
                                <h1 className='text-[26px] leading-[33px] lg:text-3xl xl:text-[40px] xl:leading-[48px] 3xl:text-[50px] 3xl:leading-[65px] font-medium text-black'>
                                    {coverArticle.title}
                                </h1>
                                <p className='text-sm lg:text-base 3xl:text-[22px] 3xl:leading-[36px] tracking-[-2%] mt-2 mb-4 md:mb-6 xl:mb-7 line-clamp-2'>
                                    {coverArticle.short_description}
                                </p>
                            </section>

                            <div className="image-wrapper lg:rounded-3xl h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full relative">
                                <Image
                                    src={coverArticle.cover_photo || ""}
                                    fill
                                    className='object-cover lg:rounded-3xl'
                                    alt={coverArticle.title || ""}
                                />
                                <div style={{
                                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.58) 89.42%)'
                                }} className="image-overlay lg:rounded-3xl absolute z-[1] bottom-0 left-0 h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full">
                                    <div className="author-tag gap-3 absolute bottom-[22px] left-5 xl:bottom-6 3xl:bottom-7 3xl:left-7 xl:left-6 flex items-center">
                                        <div className="author-image relative size-9 md:size-10 xl:size-11 3xl:size-[46px] rounded-full border">
                                            <Image
                                                src={coverArticle.user_photo || ""}
                                                fill
                                                className='rounded-full'
                                                alt={coverArticle.name || ""}
                                            />
                                        </div>
                                        <div className="author-info">
                                            <div className="author-name text-white font-medium text-sm 3xl:text-base leading-[100%]">
                                                By {coverArticle.name}
                                            </div>
                                            <div className="publish-date text-white text-[10px] 3xl:text-xs leading-[100%] mt-1">
                                                {formatArticleDate2(coverArticle.posted_date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <section className='mobile-container py-11 md:py-12 xl:py-14 3xl:py-[67px]'>
                    <h2 className='text-[22px] leading-[24px] md:text-2xl xl:text-3xl 3xl:text-[34px] font-medium mb-4 md:mb-6 xl:mb-8 3xl:mb-10'>
                        Featured articles
                    </h2>
                    
                    {articles?.length > 0 ? (
                        <>
                            <div className="grid flex-col sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {articles.map((article, index) => (
                                    <ArticleCard2 key={`${article.id}-${index}`} {...article} />
                                ))}
                            </div>
                            
                            {currentPage < totalPages && (
                                <div className="flex w-full justify-center mt-8 lg:mt-10 xl:mt-12 3xl:mt-[55px]">
                                    {isLoadingMore ? (
                                        <div className="flex justify-center items-center">
                                            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={loadMoreArticles} 
                                            className='btn-border font-medium w-[160px] 3xl:w-[189px] 3xl:h-[50px] text-red !border-red'
                                        >
                                            Load More
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <p>No articles found</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}