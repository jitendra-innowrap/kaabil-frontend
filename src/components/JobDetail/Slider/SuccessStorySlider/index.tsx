'use client'
import SuccessStoryCard from '@/components/Common/SuccessStoryCard'
import React from 'react'
import GallerySlider from '../GallarySlider'
import storyData from "@/localData/storyData.json"

export default function SuccessStorySlider() {
  return (
    <GallerySlider
        slides={storyData}
        freeMode={true}
        slideComponent={SuccessStoryCard}
        autoplayDuration={0}
        speed={4000}
        autoplay={true}
        spaceBetween={35}
        slidesPerView={"auto"}
    />
  )
}
