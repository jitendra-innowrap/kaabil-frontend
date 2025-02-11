"use client";
import React from 'react';
import GallerySlider from '../GallarySlider';
import LOGOS from '../../../../localData/companyLogos.json' assert { type: 'json' };
import Image from 'next/image';

interface LogoProps {
  src: string;
  alt: string;
}

const CompanyLogo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <div className="relative h-[68px] w-auto">
      <Image
        src={src}
        alt={alt}
        height={68}
        width={100}
        className="object-contain h-[68px] w-auto" // Ensures image scales to fit its container while maintaining aspect ratio
        sizes=""
      />
    </div>
  );
};

const CompanyLogosSlider: React.FC = () => {
  return (
    <div className="">
      <GallerySlider
        slides={LOGOS}
        freeMode={true}
        slideComponent={CompanyLogo}
        autoplayDuration={0}
        speed={4000}
        autoplay={true}
        spaceBetween={35}
        slidesPerView={"auto"}
      />
    </div>
  );
};

export default CompanyLogosSlider;
