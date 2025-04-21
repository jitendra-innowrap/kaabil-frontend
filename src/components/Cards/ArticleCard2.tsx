import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ArticleCard2(props: ArticleCard) {
  const articleData={
    slug:"mental-health-support",
    image:"/new-assets/images/article1.png",
    title: "Mental health support- not a one-off area of focus",
    desc: "Mental health is an essential pillar of our overall well-being, yet it has historically been overshadowed by physical health. It’s only in recent years that",
    authorProfile: "/new-assets/images/articles/author-profile.png",
    authorName: "Praveen Kumari Singh",
    publishDate: "Oct 20th 2024"

  }
  return (
    <Link href={`/articles/${props?.id}`} className='!P-[5px] block rounded-xl shadow-lg bg-white cursor-pointer group'>
        <div className="block p-[5px]">
        <div className="overflow-hidden rounded-lg">
          <Image
          src={props?.cover_photo}
          width={447}
          height={273}
          className='mx-auto w-full group-hover:scale-110 transition-all duration-300'
          alt="company-icons"
          quality={100}
          />
        </div>
        </div>   
        <div className="block p-3 md:p-4 2xl:p-5">
            <h3 className='font-medium text-black text-[16px] md:text-base 2xl:text-2xl mb-2 lg:mb-4 xl:mb-5 2xl:mb-6 line-clamp-3'>{props?.title}</h3>
            <p className='font-light text-[#626262] text-xs 2xl:text-base line-clamp-5  mb-4 xl:mb-5'>{props?.short_description}</p>
            <div className="flex justify-between gap-2 sm:gap-1 flex-wrap">
              <div className="flex items-center gap-1">
                <div className="author-image relative size-6 rounded-full border">
                    <Image
                        src={props?.user_photo}
                        fill
                        className='rounded-full'
                        alt='By Dummy Name '
                    />
                </div>
                <div className="author-info">
                    <div className="author-name text-black font-medium  text-[10px] 2xl:text-sm">By {props?.name || 'Anonymus User'} |</div>
                </div>
                <span className='font-light text-[#898989] text-[10px] 2xl:text-sm'>{props?.posted_date}</span> 
              </div>
                <Link href={`/articles/new`} className='underline ml-auto font-medium text-[10px] 2xl:text-sm'>Read more</Link>
            </div>
        </div>

    </Link>
  )
}
