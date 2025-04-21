import React, { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import GallerySlider from "../JobDetail/Slider/GallarySlider";
import CompanyGallerycard from "../Cards/CompanyGallerycard";
import Popup from "reactjs-popup";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SuccessCard from "../Cards/SuccessCard";
import Image from "next/image";

// Main Gallery Component
const SuccessGallary: React.FC<{ galleryItems: SuccessCard[] }> = ({
  galleryItems,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const popupRef = useRef<any>(null);

  // Handle click on a gallery item
  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setOpen(false);
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  // Navigate to previous item
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  // Navigate to next item
  const goToNext = () => {
    setActiveIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const successSlides = galleryItems.map((success, index) => (
      <div className={`success-story-card cursor-pointer ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleSlideClick(index)}>
        <SuccessCard key={index} {...success} />
      </div>
    ));

  // Get current active item
  const activeItem = galleryItems[activeIndex];

  return (
    <div>
      {/* Gallery Slider */}
      <div className="block">
        <GallerySlider
          slides={[...successSlides]}
          spaceBetween={25}
          loop={true}
          autoplay={true}
          autoplayDuration={3000}
          freeMode={false}
          slidesPerView={2}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
            },
            600: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
        />
      </div>

      {/* Enhanced Popup with Navigation */}
      <Popup
        ref={popupRef}
        open={open}
        onClose={closePopup}
        modal
        closeOnDocumentClick
        className="company-gallery-popup"
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
        }}
        contentStyle={{
          width:'auto',
          maxWidth: "100vw",
          maxHeight: "90vh",
          background: "transparent",
          overflow:'visible',
          border: "none",
          position: "relative",
        }}
      >
        <div className="flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute top-0 left-full -translate-x-[5px] translate-y-[5px] z-10 size-7 xl:size-10 2xl:size-11 3xl:size-[50px] grid place-items-center p-0 text-white bg-[#231F20] rounded-md hover:bg-black"
            aria-label="Close gallery"
          >
            <IoMdClose size={20} />
          </button>

          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="fixed left-0 z-10 p-0 size-7 xl:size-10 2xl:size-11 3xl:size-[50px] grid place-items-center text-white bg-black rounded-full translate-x-1/2 hover:bg-black"
            aria-label="Previous"
          >
            <FaChevronLeft size={15} />
          </button>

          {/* Media content */}
          <div className="flex items-center justify-center w-full h-full">
            {activeItem?.media_type === "2" ? (
              <video
                src={activeItem?.media_url}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-[600px] max-w-[60vw]  rounded-md"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                    className="bg-white w-[600px] max-w-[60vw] impact-testimonial rounded-2xl xl:rounde-[20px] 3xl:rounded-3xl p-4 md:p-5 xl:p-7 3xl:p-10"
                  >
                    {/* User Details */}
                    <div className="flex flex-col md:flex-row md:items-center mb-3 md:mb-4 xl:mb-5 3xl:mb-6">
                      <div className="">
                        <Image
                          src="/new-assets/images/about/testimonial-profile.png"
                          alt="Shashikala Bandaru"
                          width={80}
                          height={80}
                          className="rounded-full object-cover size-20 xl:size-16 3xl:size-20"
                        />
                      </div>
                      <div className="md:ml-4 mt-[10px] md:mt-0">
                        <h3 className="font-semibold xl:text-lg 3xl:text-xl text-black truncate">Shashikala Bandaru</h3>
                        <p className="text-sm xl:text-base text-gray-600 truncate">Process Associate, TCS</p>
                      </div>
                    </div>
              
                    {/* Testimonial Content */}
                    <p className="impact-desc text-sm xl:text-base leading-relaxed text-gray-700 md:line-clamp-6">
                      Overcoming adversity, Shashikala rose above her challenges, transforming from a stone grinder to a
                      successful Software Tester at Tata Consultancy Services Ltd. With the support of the Pride School
                      Programme, she turned her dreams into reality, proving that resilience and determination can create
                      a brighter future.
                    </p>
                  </div>
            )}
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="fixed right-0 z-10 p-0 size-7 xl:size-10 2xl:size-11 3xl:size-[50px] grid place-items-center text-white bg-black rounded-full -translate-x-1/2 hover:bg-black"
            aria-label="Next"
          >
            <FaChevronRight size={15} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 whitespace-nowrap transform -translate-x-1/2 px-3 py-1 text-white bg-black bg-opacity-50 rounded-full text-sm">
            {activeIndex + 1} / {galleryItems.length}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default SuccessGallary;