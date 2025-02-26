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
  const [videoUrl, setVideoUrl] = useState("");
    const [open, setOpen] = useState(false)
    const popupRef = useRef<any>(null);
  // Handle click on a gallery item
  const handleSlideClick = (index: number, videoUrl:string) => {
    setActiveIndex(index);
    setIsOpen(true);
    setOpen(true);
    setVideoUrl(videoUrl)
  };
  const closePopup = () => {
    setOpen(false);
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  // Map gallery items to slides
  const gallerySlides = galleryItems.map((item, index) => (
    <CompanyGallerycard
      key={item.id}
      item={item}
      onClick={() => item?.media_type=="2" ?handleSlideClick(index, item?.media_url): ""}
    />
  ));

  // Prepare lightbox slides
  const lightboxSlides = galleryItems.map((item) => ({
    src: item.media_url,
    thumbnail: item.media_thumbnail,
    type: item.media_type === "video" ? "video" : "image", // Specify type for videos
  }));

  return (
    <div>
      {/* Gallery Slider */}
      <div className="block">
        <GallerySlider
          slides={gallerySlides}
          spaceBetween={25}
          showNavigation
          loop={true}
          autoplay={true}
                            autoplayDuration={3000}
                            freeMode={false}
        />
      </div>

      {/* Lightbox */}
      {/* <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={lightboxSlides}
        index={activeIndex}
        plugins={[Thumbnails]} // Add Thumbnails plugin
        render={{
          slide: (slide) => {
            if (slide.type === "video") {
              return (
                <video
                  controls
                  autoPlay
                  style={{ width: "100%", height: "auto" }}
                >
                  <source src={slide.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            }
            return <img src={slide.} alt="" style={{ width: "100%", height: "auto" }} />;
          },
        }}
      /> */}
      <Popup
              ref={popupRef}
              open={open}
              onClose={closePopup}
              modal
              className="video-payer"
              overlayStyle={{
                background: '#4D4D4DC2',
                padding: '20px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <video src={videoUrl} controls autoPlay playsInline></video>
            </Popup>
    </div>
  );
};

export default CompanyGallery;