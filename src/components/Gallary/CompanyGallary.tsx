import React, { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import GallerySlider from "../JobDetail/Slider/GallarySlider";
import CompanyGallerycard from "../Cards/CompanyGallerycard";
import Popup from "reactjs-popup";

// Main Gallery Component
const CompanyGallery: React.FC<{ galleryItems: (CompanyImage | CompanyVideo)[] }> = ({
  galleryItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaType, setMediaType] = useState<string>(""); // Use empty string as initial value
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const popupRef = useRef<any>(null);

  // Handle click on a gallery item
  const handleSlideClick = (index: number, item: CompanyImage | CompanyVideo) => {
    setMediaType(item?.media_type || ""); // Ensure media_type is set correctly
    setActiveIndex(index);
    setMediaUrl(item?.media_url || "");

    setIsOpen(true);
    setOpen(true);
  };

  // Close the popup and reset states
  const closePopup = () => {
    setOpen(false);
    setIsOpen(false);
    setMediaType(""); // Reset mediaType
    setMediaUrl(""); // Reset mediaUrl
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  // Map gallery items to slides
  const gallerySlides = galleryItems.map((item, index) => (
    <CompanyGallerycard
      key={item.id}
      item={item}
      onClick={() => handleSlideClick(index, item)}
    />
  ));

  return (
    <div>
      {/* Gallery Slider */}
      <div className="block">
        <GallerySlider
          slides={[...gallerySlides]}
          spaceBetween={25}
          showNavigation
          loop={true}
          autoplay={false}
          autoplayDuration={3000}
          freeMode={false}
          slidesPerView={2}
          breakpoints={{
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

      {/* Popup for displaying media */}
      <Popup
        ref={popupRef}
        open={open}
        onClose={closePopup}
        modal
        className="video-payer company-gallary"
        overlayStyle={{
          background: "#4D4D4DC2",
          padding: "20px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {mediaType === "2" ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            playsInline
            style={{ width: "auto", height: "auto", maxHeight:"400px", margin:"auto " }}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt=""
            style={{ width: "auto", height: "500px", maxHeight:"60vh", margin:"auto" }}
          />
        )}
      </Popup>
    </div>
  );
};

export default CompanyGallery;