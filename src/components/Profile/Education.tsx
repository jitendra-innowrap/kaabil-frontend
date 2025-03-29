import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEducationModal } from "@/redux/profileSlice";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { lightBoxStyle } from "../utils";

const Education = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  console.log(profileData?.user_certifications, "From Education");
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    const imageSlides =
      profileData?.user_certifications
        ?.filter((item: any) => item.attachment_type === "1")
        .map((item: any) => ({ src: item.media_url })) || [];

    setSlides(imageSlides);
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        on={{
          // @ts-ignore
          change: (index: any) => setCurrentIndex(index),
        }}
        styles={lightBoxStyle}
      />
      <div className="bg-white rounded-lg mt-3 px-12 py-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex justify-between">
            <div className="flex gap-3 items-center">
              <img src="/new-assets/icons/graduation-cap.svg" />
              <h1 className="text-[#231F20] font-semibold text-md">
                Education
              </h1>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                dispatch(setEducationModal(true));
              }}
            >
              <img
                src="/new-assets/icons/ink_marker.svg"
                className="h-3 mt-1"
                alt=""
              />
              <span className="text-sm font-bold text-red">Edit</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-12 flex gap-14">
            <div>
              <h1 className="text-sm text-[#4D4D4F]">Highest Education</h1>
            </div>
            <div>
              <h1 className="text-sm font-medium text-[#231F20]">
                {profileData?.education_name}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-col-12 mt-4">
          <div className="col-span-12">
            <h1 className="text-[#231F20] text-sm">Certification</h1>
          </div>
          <div className="col-span-12 mt-2 flex gap-3 flex-wrap">
            {profileData?.user_certifications?.length > 0 ? (
              profileData.user_certifications.map(
                (
                  cert: {
                    id: string;
                    media_url: string;
                    user_certification_title: string;
                    attachment_type: string;
                  },
                  index: number
                ) => (
                  <div key={cert.id} className="text-center">
                    {cert.attachment_type === "2" ? (
                      <a
                        href={cert.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <img
                          src="/new-assets/icons/pdf_logo (1).png"
                          className="h-24 w-24 object-cover rounded-md light-shadow"
                          alt={cert.user_certification_title || "Certificate"}
                        />
                        <h1 className="text-xs mt-2 text-[#231F20]">
                          {cert.user_certification_title || "PDF Certification"}
                        </h1>
                      </a>
                    ) : (
                      <div
                        onClick={() => handleImageClick(index)}
                        className="cursor-pointer"
                      >
                        <img
                          src={cert.media_url}
                          alt={cert.user_certification_title || "Certificate"}
                          className="h-24 w-24 object-cover rounded-md"
                        />
                        <h1 className="text-xs mt-2 text-[#231F20]">
                          {cert.user_certification_title ||
                            "Untitled Certification"}
                        </h1>
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <div>-</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
