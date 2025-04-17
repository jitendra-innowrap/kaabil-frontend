import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/Cards/ArticleCard'
import ArticleCard2 from '@/components/Cards/ArticleCard2'
import Image from 'next/image'
import React from 'react'

export default function page() {
    const jobsList = [{}, {},{}, {},{}, {},{}, {},]
    return (
        <main className='container no-mobile-container'>
            <div className='mobile-container'>
                <div className="mt-5 3xl:mt-6 mb-7 3xl:mb-8">
                    <Breadcrumb root='Home' category='Articles' />
                </div>
                <section className=''>
                    <h1 className='text-[26px] leading-[33px] lg:text-3xl xl:text-4xl 3xl:text-[50px] 3xl:leading-[65px] font-medium text-black'>Jobs: Unlocking Women’s Economic Potential and Boosting Economies </h1>
                    <p className='text-sm lg:text-base xl:text-xl 3xl:text-[22px] 3xl:leading-[36px] tracking-[-2%] mt-2  mb-4 md:mb-6 xl:mb-7'>The global economy has stabilized, but developing economies still face a tougher slog ahead. As countries work to promote growth and drive ...</p>
                </section>
            </div>
            <div className="image-wrapper lg:rounded-3xl h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full relative">
                <Image
                    src={'/new-assets/images/articles/article-1.webp'}
                    fill
                    className='object-cover lg:rounded-3xl '
                    alt='Jobs: Unlocking Women’s Economic Potential and Boosting Economies '
                />
                <div style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.58) 89.42%)'
                }} className="image-overlay lg:rounded-3xl absolute z-[1] bottom-0 left-0 h-[400px] md:h-[600px] xl:h-[500px] 3xl:h-[807px] w-full">
                    <div className="author-tag gap-3 absolute bottom-[22px] xl:bottom-6  3xl:bottom-7 3xl:left-7 xl:left-6 left-10  flex items-center">
                        <div className="author-image relative size-9 md:size-10 xl:size-11 3xl:size-[46px] rounded-full border">
                            <Image
                                src={'/new-assets/images/articles/author-profile.png'}
                                fill
                                className='rounded-full'
                                alt='By Dummy Name '
                            />
                        </div>
                        <div className="author-info">
                            <div className="author-name text-white font-medium text-sm 3xl:text-base leading-[100%]">By Dummy Name</div>
                            <div className="publish-date text-white text-[10px] 3xl:text-xs leading-[100%] mt-1">10 April 2025</div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='mobile-container py-11 md:py-12 xl:py-14 3xl:py-[67px]'>
                <h2 className='text-[22px] leading-[24px] md:text-2xl xl:text-3xl 3xl:text-[34px] font-medium mb-4 md:mb-6 xl:mb-8 3xl:mb-10'>Featured articles</h2>
                <div className="grid flex-col sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {jobsList.map((job, index) => (
                        <ArticleCard2 key={index} {...job} />
                    ))}
                </div>
            </section>
        </main>

    )
}

