import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import api from "@/Services/Apiservice";
import toast from "react-hot-toast";
import {
  setUserIsProfileVerified,
  setUserPhotoUrl,
  setUserWAConsent,
} from "@/redux/userSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

interface prop {
  closePopup: () => void;
}

export default function OnBoardingComplete({ size, closePopup }: any) {
  const progress = useAppSelector((state) => state.progress.value);
  const { experience, name, role_id, skills, photo_url, is_whatsapp_show } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [WAConsent, setWAConsent] = useState(
    is_whatsapp_show === false ? false : true
  );
  const [tncChecked, setTncChecked] = useState(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("is_whatsapp_show", WAConsent ? "1" : "0"); // Append the file safely
      formData.append("is_profile_verify", "1"); // Append the file safely
      formData.append("is_tnc_checked", tncChecked ? "1" : "0");
      // Submit the form data
      const response = await api.post("/Auth/editJobSeekerPrpfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.code === 1) {
        toast.success("Profile updated successfully!", {
          position: "bottom-right",
        });
        dispatch(setUserWAConsent(WAConsent));
        dispatch(setUserIsProfileVerified("1"));
        closePopup(); // Close the modal or navigate to the next step
      } else {
        toast.error(response?.data?.message || "Submission failed!", {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error?.message || "Something went wrong!", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Ensure file is not undefined
      try {
        const formData = new FormData();
        formData.append("photo_url", file); // Append the file safely
        // Submit the form data
        const response = await api.post(
          "/Auth/editJobSeekerPrpfile",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response?.data?.code === 1) {
          toast.success("Profile updated successfully!", {
            position: "bottom-right",
          });
          dispatch(setUserPhotoUrl(response.data.result?.[0]?.photo_url));
        } else {
          toast.error(response?.data?.message || "Submission failed!", {
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        console.error("Error updating profile:", error);
        toast.error(error?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("No file selected");
      toast.error("Please select a file before submitting.", {
        position: "bottom-right",
      });
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    // @ts-ignore
    <Dialog
      open={progress === 11}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed -top-10 -translate-x-1/2  onboarding-scale" : ""
      }`}
    >
      <div className="pb-6 onboarding-complete">
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              size={size === "md" ? 32 : 28}
              onClick={closePopup}
            />
            <div className="flex justify-center items-center mt-16 xl:mt-6 xl:mb-1 2xl:mt-6 3xl:my-8">
              <h2
                className={`text-[#231F20] font-semibold ${
                  size === "md" ? "!text-[26px]" : "!text-[22px]"
                } text-center`}
              >
                <span className="text-red font-semibold">Congrats!</span> <br />
                <span className="font-semibold">Your profile is active</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className={`${size === "md" ? "block mt-6 xl:mt-0" : "mt-2"}`}
        >
          {/* @ts-ignore */}
          <DialogBody className="custom-dialog-body custom-scroll">
            <div
              className={`pb-2 cursor-pointer ${
                size === "md" ? "px-12" : "px-0"
              }`}
            >
              <div className="wlcm-profile-card p-4 flex-col sm:flex-row rounded-lg border-[1.6px] border-[#E3ECFB] shadow-tertiary justify-start flex sm:gap-4">
                <div className="flex flex-col justify-center items-center profile-photo-wrapper">
                  <Image
                    src={photo_url || "/new-assets/icons/avatar.svg"}
                    alt="profile-photo"
                    className="w-[100px] h-[100px] mr-1 rounded-full object-fit"
                    width={150}
                    height={150}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    className="hidden"
                  />
                  <div
                    onClick={handleUploadClick}
                    className="!rounded-full py-2 !px-2 lg:text-[10px]  lg:text-center bg-red text-white"
                  >
                    Upload Photo
                  </div>
                </div>
                <div className="">
                  <h5 className="font-semibold text-black mb-1 text-center sm:text-left">
                    {name}
                  </h5>
                  {/* <h5 className="text-black mb-1 font-medium text-center sm:text-left">
                    {role_id === 1 ? 'UI/UX Designer' : 'Other Role'} Replace with actual role mapping
                  </h5> */}
                  {experience.length > 0 && (
                    <>
                      <h6 className="text-sm text-[#4D4D4F] mb-2">
                        {experience[0].company_name}{" "}
                        <GoDotFill className="inline-block size-3" />{" "}
                        {experience[0].job_type_name}
                      </h6>
                      <h6 className="text-sm text-[#4D4D4F] select-job-role-label">
                        Selected job roles:
                      </h6>
                      <div className="line-clamp-1">
                      {experience.map((exp, i) => (
                        <h6
                          key={i}
                          className="text-sm font-medium mb-2 inline mr-2"
                        >
                          <GoDotFill className="inline-block size-3" />{" "}
                          {exp.designation_name}
                        </h6>
                      ))}
                      </div>
                    </>
                  )}
                  <div className="flex gap-1 text-[#4D4D4F] text-sm mt-2">
                    Skills{" "}
                    <span className="size-5 bg-[#F9D1D7] rounded-full text-center">
                      {skills?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 my-4 xl:my-2 xl:mt-3 3xl:mt-4 3xl:my-4">
                <input
                  type="checkbox"
                  name="whatsapp_consent"
                  className="!mb-0 !mt-1 cursor-pointer !flex-shrink-0 block !w-4 !h-auto wc-check "
                  id="whatsapp_consent"
                  checked={WAConsent}
                  onChange={(e) => {
                    // Update the Redux store or state for WhatsApp consent
                    setWAConsent(!WAConsent);
                  }}
                />
                <label
                  className="!mb-0 inline-block wc-label text-[#4D4D4F]"
                  htmlFor="whatsapp_consent"
                >
                  I consent to share my number with the recruiter for connecting
                  with me via
                  <Image
                    src={"/new-assets/icons/whatsapp.svg"}
                    alt="whatsapp-icon"
                    className="w-[89px] h-[20px] inline ml-2"
                    width={100}
                    height={30}
                    quality="100"
                  />
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="is_tnc_checked"
                  className="!mb-0 !mt-1 cursor-pointer !flex-shrink-0 block !w-4 !h-auto agree-check"
                  id="is_tnc_checked"
                  checked={tncChecked}
                  onChange={(e) => {
                    // Update the Redux store or state for WhatsApp consent
                    setTncChecked(!tncChecked);
                  }}
                />
                <div className="flex">
                  <label
                    className="!mb-0 inline-block text-[#4D4D4F] whitespace-nowrap agree-label"
                    htmlFor="is_tnc_checked"
                  >
                    <div className="flex gap-1">
                      I agree to the{" "}
                      <a
                        href="https://meuat.kaam.com/privacy_policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b-[1px] border-[#4D4D4F] text-[#4D4D4F] cursor-pointer"
                      >
                        terms of use
                      </a>
                      .
                    </div>
                  </label>
                </div>
              </div>
              {!tncChecked && (
                <span className="text-red text-[15px]">
                  You must agree to the terms of use to proceed.
                </span>
              )}
            </div>
          </DialogBody>
          {/* @ts-ignore */}
          <DialogFooter className="p-0 pb-6 !px-12 mt-5 flex justify-center progress-footer">
            <button
              className={`flex-shrink-0 justify-start bg-red text-white px-4 py-2 rounded ${
                isSubmitting || !tncChecked
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isSubmitting || !tncChecked}
              type="submit"
            >
              Next
            </button>
          </DialogFooter>
        </form>
      </div>
    </Dialog>
  );
}
