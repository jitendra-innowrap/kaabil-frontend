import Image from 'next/image';
import React from 'react';

// Define the type for the component props
interface ResourceCardProps {
  id: string | number;  // or use 'string' if it's guaranteed to be a string
  imageUrl: string;
  title: string;
}

export default function ResourceCard({ id, imageUrl, title }: ResourceCardProps) {
  console.log(title,'from card')
  return (
    <div key={id} className="block w-[203px] xl:w-[403px]">
      <div className="relative aspect-w-403 aspect-h-227 mb-5 xl:mb-6">
        <Image
          src={imageUrl ?? '/assets/sliders/default.png'} // Provide a default image if missing
          alt="Resource image"
          width={409}
          height={279}
          draggable="false"
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="font-bold text-white text-xl md:text-2xl xl:text-3xl 2xl:text-4xl">
        {title || 'Untitled Resource'}  {/* Fallback text if title is missing */}
      </h4>
    </div>
  );
}
