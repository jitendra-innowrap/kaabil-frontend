import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/Cards/ArticleCard'
import { FaFacebook, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import ShareButton from '@/components/Articles/ShareButton'

export default function page() {
    const jobsList = [{}, {},{}, {},{}, {},{}, {},]
    return (
        <main className=''>
            <div className="image-wrapper h-[400px] md:h-[600px] max-h-[60vh] 3xl:h-[807px] w-full relative">
                <Image
                    src={'/new-assets/images/articles/article-1.webp'}
                    fill
                    className='object-cover '
                    alt='Jobs: Unlocking Women’s Economic Potential and Boosting Economies '
                />
                <div style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.66) 70.73%)'
                }} className="image-overlay absolute z-[1] bottom-0 left-0 h-[400px] md:h-[600px] flex items-end max-h-[60vh] 3xl:h-[807px] w-full">
                    <div className="author-tag mb-[22px] md:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-[34px] container bottom-[22px] xl:bottom-6  3xl:bottom-7 3xl:left-7 xl:left-6 left-10">
                        <h1 className='text-[26px] text-white leading-[33px] lg:text-3xl xl:text-4xl 3xl:text-[50px] 3xl:leading-[65px] font-medium max-w-[1000px] '>Jobs: Unlocking Women’s Economic Potential and Boosting Economies </h1>
                        <div className="flex items-center gap-3 mt-4">
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
            </div>

            <section className='container  py-11 md:py-12 xl:py-14 3xl:py-[67px]'>
                <div className="relative">
                    <ShareButton/>
                    <div className="content w-[95%] md:w-full" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus natus facilis similique. Beatae repellendus ipsa, facilis vero nesciunt rem pariatur quam, inventore ea ratione alias facere eos nemo voluptatibus aut officiis ex non debitis voluptates quibusdam cum qui veritatis. Explicabo recusandae aliquam quaerat quos dolor ipsum vitae aperiam facilis voluptatibus provident vel placeat temporibus magni error, ducimus odit eaque aliquid voluptas tempore eius ipsam. Qui magni commodi temporibus obcaecati, praesentium excepturi quas magnam totam aut iste dolore doloribus, aliquam beatae culpa mollitia voluptate at possimus nostrum corrupti iure, repellat error? Provident magnam quasi autem facilis necessitatibus ad nostrum a illum tempore dignissimos harum neque, modi, ut nam esse quibusdam, molestiae doloremque ducimus ab? Vitae, ullam quam? Tenetur facilis nemo ea nam minima vel ab provident dolorum inventore deserunt, error quos aperiam at. Sint vitae dicta, laudantium, minus distinctio molestias ab molestiae laboriosam quod placeat voluptates corporis nisi, nobis rem blanditiis. Eveniet esse quod doloribus laudantium explicabo totam necessitatibus commodi, blanditiis debitis quidem, itaque illo facere, similique eius voluptates aperiam porro cum pariatur possimus dolorum quasi corporis labore deserunt voluptas. Reiciendis, sequi ut cum repellat, laboriosam corporis facere perferendis quasi amet incidunt eum eos cumque consequuntur nisi tenetur tempore atque?
                    </div>
                </div>
            </section>
        </main>

    )
}

