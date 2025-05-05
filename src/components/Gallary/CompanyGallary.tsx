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

// Main Gallery Component
const CompanyGallery: React.FC<{ galleryItems: (CompanyImage | CompanyVideo)[] }> = ({
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

  // Map gallery items to slides
  const gallerySlides = galleryItems.map((item, index) => (
    <CompanyGallerycard
      key={item.id}
      item={item}
      onClick={() => handleSlideClick(index)}
    />
  ));

  // Get current active item
  const activeItem = galleryItems[activeIndex];

  return (
    <div>
      {/* Gallery Slider */}
      <div className="block">
        <GallerySlider
          slides={[...gallerySlides]}
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
                className="max-w-full max-h-[80vh] rounded-md"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={activeItem?.media_url}
                alt=""
                className="max-w-full max-h-[80vh] object-contain rounded-md"
              />
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
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 text-white bg-black bg-opacity-50 rounded-full text-sm">
            {activeIndex + 1} / {galleryItems.length}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CompanyGallery;