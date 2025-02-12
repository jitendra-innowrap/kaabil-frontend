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

export default function Note() {
  const ref = React.useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });

  // Code to get your note content...
  const fullText = 'Tech Mahindra offers technology consulting and digital solutions to global enterprises across industries, enabling transformative scale at unparalleled speed. With 150,000+ professionals across 90+ countries helping 1100+ clients, TechM provides a full spectrum of services including consulting, information technology, enterprise solutions, and more. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatem.';

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