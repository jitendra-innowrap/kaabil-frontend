import Image from 'next/image'
import React from 'react'

interface SuccessStoryCardProps {
  profile: string;
  description: string;
  name: string;
  designation: string;
  location: string;
}

export default function SuccessStoryCard({
  profile,
  description,
  name,
  designation,
  location
}: SuccessStoryCardProps) {
  return (
    <div className="block bg-[#FFEDCE] p-6 rounded-3xl min-w-[80%] min-h-full xl:min-w-[675px] md:p-8 xl:p-10 2xl:p-12">
      <Image
        src={"/assets/icons/qoutes.png"}
        width={100}
        height={100}
        alt="quote icon"
        className="block"
      />
      <p className="text-lg xl:text-2xl 2xl:text-3xl py-3 xl:py-8 md:w-[587px] 2xl:w-[787px]">{description}</p>
      <div className="flex gap-4 xl:gap-6 2xl:gap-8">
        <Image
          src={profile}
          width={80}
          height={73}
          alt="profile picture"
          className="block"
        />
        <div className="block">
          <p className="text-[#E41C3B] text-base xl:text-lg 2xl:text-2xl">{name}</p>
          <p className="text-[#787878] text-base xl:text-lg 2xl:text-2xl">{designation}</p>
          <p className="text-[#787878] text-base xl:text-lg 2xl:text-2xl">{location}</p>
        </div>
      </div>
    </div>
  );
}
