'use client'
import React, { useState, useLayoutEffect } from 'react'

const useTruncatedElement = ({ ref }: {ref:any}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isReadingMore, setIsReadingMore] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  return {
    isTruncated,
    isReadingMore,
    setIsReadingMore,
  };
};

export default function Note({fullText}:{fullText:string}) {
  const ref = React.useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });


  return (
    <div>
      <div ref={ref} className={`break-words text-xs leading-6 3xl:text-sm 3xl:leading-[32px] ${!isReadingMore && 'line-clamp-3'}`}
      dangerouslySetInnerHTML={{
        __html:
          fullText && typeof fullText === "string"
            ? fullText
            : "",
      }}/>
      {isTruncated && !isReadingMore && (
        <span aria-label='read more button' className='cursor-pointer font-semibold text-xs leading-6 3xl:text-sm 3xl:leading-[32px]' onClick={() => setIsReadingMore(true)}>
          Read more
        </span>
      )}
    </div>
  )
}