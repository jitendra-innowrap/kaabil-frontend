"use client";
import React from 'react';
import IndustryCard from '@/components/Common/IndustryCard';
import GallerySlider from '../GallarySlider';
import LOGOS from '../../../../localData/industryData.json' assert { type: 'json' };

interface InfiniteSliderProps{
  reverse?:boolean
}
const InfiniteSlider: React.FC<InfiniteSliderProps> = ({reverse=false}) => {
  return (
    <div className="">
      <GallerySlider
        slides={LOGOS}
        freeMode={false}
        slideComponent={IndustryCard}
        autoplayDuration={0}
        speed={4000}
        autoplay={true}
        reverse={reverse}
        spaceBetween={25}
        slidesPerView={"auto"}
        />
    </div>
  );
};

export default InfiniteSlider;
