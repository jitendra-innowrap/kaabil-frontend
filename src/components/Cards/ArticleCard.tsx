import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatArticleDate } from '../utils'

export default function ArticleCard({ cover_photo, id, name, posted_date, short_description, title, user_photo}:ArticleCard) {
  return (
    <Link href={`/articles/${id}`} className='!P-[5px] block text-black rounded-xl shadow-lg h-full bg-white cursor-pointer group relative article-card'>
        <div className="block p-[5px]">
        <div className="overflow-hidden rounded-lg">
          <Image
          src={cover_photo}
          width={447}
          height={273}
          className='mx-auto group-hover:scale-110 transition-all duration-300 h-[170px] md:h-[232px] lg:h-[154px] xl:h-[175px] 2xl:h-[210px] 3xl:h-[251px] object-cover'
          alt={title}
          quality={100}
          />
        </div>
        </div>   
        <div className="flex flex-col justify-between p-3 md:p-4 2xl:p-5">
            <div className="article-content">
              <div className="article-info">
                <h3 className='font-medium text-[16px] md:text-base 2xl:text-2xl mb-2 lg:mb-4 xl:mb-5 2xl:mb-6 line-clamp-3'>{title}</h3>
                <p className='font-light text-[#626262] text-xs 2xl:text-base line-clamp-5 mb-6 md:mb-4 xl:mb-5'>{short_description}</p>
              </div>
              <div className="flex justify-between article-footer absolute w-full bottom-3 left-0 px-3 md:px-4 2xl:px-5">
                  <span className='font-light text-[#898989] text-[10px] 2xl:text-sm'>{formatArticleDate(posted_date)}</span> 
                  <Link href={`/articles/${id}`} className='underline font-medium text-[10px] 2xl:text-sm'>Read more</Link>
              </div>
            </div>
        </div>

    </Link>
  )
}
