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
      <p ref={ref} className={`break-words text-xl ${!isReadingMore && 'line-clamp-3'}`}>
        {fullText}
      </p>
      {isTruncated && !isReadingMore && (
        <span aria-label='read more button' className='cursor-pointer font-semibold' onClick={() => setIsReadingMore(true)}>
          Read more
        </span>
      )}
    </div>
  )
}