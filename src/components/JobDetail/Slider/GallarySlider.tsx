"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface GallerySliderProps extends SwiperOptions {
  slides: Array<any>; // Accept any type to handle custom slide components
  autoplayDuration?: number; // Autoplay duration in ms
  loop?: boolean; // Enable or disable looping
  autoplay?: boolean; // Enable or disable autoplay
  customArrowLeft?: React.ReactNode; // Custom left arrow component
  customArrowRight?: React.ReactNode; // Custom right arrow component
  showNavigation?: boolean; // Show or hide navigation arrows
  onHoverPause?: boolean; // Pause on hover
  reverse?: boolean; // Reverse autoplay direction
  freeMode?: boolean; // Enable free mode
  arrowOut?: boolean; //
  arrowColor?: string;
  arrowShadows?: boolean;
  slideComponent?: React.ComponentType<any>; // Custom slide component
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  slides,
  autoplayDuration,
  loop = true,
  autoplay = true,
  customArrowLeft,
  customArrowRight,
  showNavigation = false,
  arrowOut = true,
  freeMode = false,
  speed,
  spaceBetween = 25,
  slidesPerView = 'auto',
  reverse = false,
  arrowColor = '',
  onHoverPause = false,
  arrowShadows = false,
  slideComponent: SlideComponent = null,
  ...restProps
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLDivElement | null>(null);
// State to track if the Swiper is at the first or last slide
const [isBeginning, setIsBeginning] = useState(true);
const [isEnd, setIsEnd] = useState(false);



  // Autoplay settings
  const autoplayConfig = autoplay
    ? {
        delay: autoplayDuration,
        disableOnInteraction: false,
        pauseOnMouseEnter: onHoverPause,
        reverseDirection: reverse,
      }
    : false;
 // Update the state when the Swiper slides change
 const updateNavigationState = (swiper: SwiperType) => {
  setIsBeginning(swiper.isBeginning);
  setIsEnd(swiper.isEnd);
};

// Initialize Swiper and set up event listeners
useEffect(() => {
  if (swiperRef.current) {
    swiperRef.current.on('slideChange', () => {
      updateNavigationState(swiperRef.current!);
    });
  }
}, []);
  return (
    <div className={`relative slider-wrapper ${showNavigation && arrowOut?'md:px-6 sm:px-10 2xl:px-[60px]':'px-3'}`}>
      <Swiper
        modules={[Autoplay, Navigation, FreeMode]}
        loop={loop}
        autoplay={autoplayConfig}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        freeMode={freeMode}
        speed={speed}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigationState(swiper); // Initialize the state
        }}
        onSlideChange={(swiper) => updateNavigationState(swiper)} // Update state on slide change
        navigation={
          showNavigation
            ? {
                prevEl: prevButtonRef.current,
                nextEl: nextButtonRef.current,
              }
            : undefined
        }
        {...restProps}
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index} style={{ width: 'fit-content', height: '100%' }}>
            {SlideComponent ? (
              <SlideComponent {...slide} />
            ) : (
              slide
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      {showNavigation && (
        <div
          ref={prevButtonRef}
          onClick={() => swiperRef.current?.slidePrev()}
          className={`swiper-button-prev absolute left-0 !size-8 rounded-full !w-fit  !text-lightGrey ${isBeginning ? 'no-disabled' : ''}`}
        >
          {customArrowLeft? customArrowLeft : <div className={`swiper-btn ${arrowColor? `bg-white` : ""} ${arrowShadows? "shadow-sm" : ""}  rounded-full !size-8 grid shrink-0 place-items-center 2xl:!size-[50px]`}>
            <IoChevronBackOutline className={`!size-3 2xl:!size-5 font-bold text-xl ${arrowColor? '!text-black':''}`}/></div>}
        </div>
      )}
      {showNavigation && (
        <div
          onClick={() => swiperRef.current?.slideNext()}
          ref={nextButtonRef}
          className={`swiper-button-next absolute right-0 !size-8 rounded-full !w-fit !text-lightGrey ${isEnd ? 'no-disabled' : ''}`}
        >
          {customArrowRight? customArrowRight : <div className={`swiper-btn ${arrowColor?  `bg-white` : ""} ${arrowShadows? "shadow-sm" : ""}  rounded-full !size-8 grid shrink-0 place-items-center 2xl:!size-[50px]`}>
            <IoChevronForwardOutline className={`!size-3 2xl:!size-5 font-bold text-xl ${arrowColor? '!text-black':''}`}/></div>}
        </div>
      )}
    </div>
  );
};

export default GallerySlider;