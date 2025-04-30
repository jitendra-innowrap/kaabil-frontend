import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatArticleDate } from '../utils'

export default function ArticleCard2(props: ArticleCard) {
  return (
    <Link href={`/articles/${props?.id}`} className='!P-[5px] block h-full rounded-xl shadow-lg relative bg-white cursor-pointer group article-card'>
        <div className="block p-[5px]">
        <div className="overflow-hidden rounded-lg">
          <Image
          src={props?.cover_photo}
          width={447}
          height={273}
          className='mx-auto w-full group-hover:scale-110 transition-all duration-300 h-[170px] md:h-[232px] lg:h-[154px] xl:h-[175px] 2xl:h-[210px] 3xl:h-[251px]'
          alt="company-icons"
          quality={100}
          />
        </div>
        </div>   
        <div className="block p-3 md:p-4 2xl:p-5">
          <div className="article-content">
            <div className="article-info">
              <h3 className='font-medium text-black text-[16px] md:text-base 2xl:text-2xl mb-2 lg:mb-4 xl:mb-5 2xl:mb-6 line-clamp-3'>{props?.title}</h3>
              <p className='font-light text-[#626262] text-xs 2xl:text-base line-clamp-5 mb-16 sm:mb-6 xl:mb-10'>{props?.short_description}</p>
            </div>
            <div className="article-footer absolute w-full bottom-3 left-0 px-3 md:px-4 2xl:px-5 flex justify-between gap-2 sm:gap-1 flex-wrap">
              <div className={`flex items-center gap-1 ${props?.name?'w-full':''} sm:w-fit`}>
                {props?.name && <div className="author-image relative size-6 rounded-full border">
                    <Image
                        src={props?.user_photo}
                        fill
                        className='rounded-full'
                        alt='By Dummy Name '
                    />
                </div>}
                <div className="author-info flex flex-wrap">
                    {props?.name && <div className="author-name  text-black font-medium flex flex-nowrap whitespace-nowrap text-[10px] 2xl:text-sm"><span className='lg:max-w-[90px] xl:max-w-[120px] 2xl:max-w-[100px] 3xl:max-w-[180px] truncate block pr-[4px]'>{`By ${props?.name} `}</span>|</div>}
                    <span className='font-light ml-1 text-[#898989] whitespace-nowrap text-[10px] 2xl:text-sm'>{formatArticleDate(props?.posted_date, ',')}</span> 
                </div>
              </div>
                <Link href={`/articles/${props.id}`} className='underline ml-auto font-medium text-[10px] 2xl:text-sm'>Read more</Link>
            </div>
          </div>
        </div>

    </Link>
  )
}
