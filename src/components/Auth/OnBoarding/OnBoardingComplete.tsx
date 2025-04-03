import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setProgress} from "@/redux/progressSlice";
import Image from "next/image";
import React, {useState, useRef, useEffect} from "react";
import {GoDotFill} from "react-icons/go";
import api from "@/Services/Apiservice";
import toast from "react-hot-toast";
import {
    setUserIsProfileVerified,
    setUserPhotoUrl,
    setUserWAConsent,
} from "@/redux/userSlice";
import styles from "../SignIn/signIn.module.css"
import {IoClose} from "react-icons/io5";
import whatsAppIcon from "../../../../public/new-assets/icons/whatsapp-icon.svg"

interface prop {
    closePopup: () => void;
}

export default function OnBoardingComplete({size, closePopup}: any) {
    const progress = useAppSelector((state) => state.progress.value);
    const {experience, name, role_id, skills, photo_url, is_whatsapp_show} =
        useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [WAConsent, setWAConsent] = useState(true);
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
            const response = await api.post("/Auth/verifyProfileStatus", formData, {
                headers: {"Content-Type": "multipart/form-data"},
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
                        headers: {"Content-Type": "multipart/form-data"},
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
        <div className="pb-6 sm:p-6">
            <div className="relative w-full">
                <IoClose
                    className="absolute top-2 right-2 cursor-pointer"
                    size={size === "md" ? 32 : 28}
                    onClick={closePopup}
                />
                <div className="flex sm:justify-center items-center pt-[74px] sm:pt-[30px] mb-[27px] sm:mb-0">
                    <h2
                        className={`text-[#231F20] font-semibold  ${
                            size === "md"
                                ? "!text-[26px] text-center"
                                : "!text-[22px] text-start"
                        }`}
                    >
                        <span className="text-red">Congrats!</span> <br/>
                        <span>Your profile is active</span>
                    </h2>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`${size === "md" ? "block mt-6" : "mt-2"}`}
            >
                <div
                    className={`pb-2 cursor-pointer ${
                        size === "md" ? "max-w-[528px] mx-auto" : "px-0"
                    }`}
                >
                    <div
                        className="p-4 flex-row rounded-lg border-[1.6px] border-[#E3ECFB] shadow-tertiary justify-start flex gap-2 sm:gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                src={photo_url || "/new-assets/icons/avatar.svg"}
                                alt="profile-photo"
                                className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-full object-fit mx-auto block"
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
                                className="!rounded-full mt-[8px] py-2 !px-2 text-[10px] lg:text-[10px]  lg:text-center bg-red text-white"
                            >
                                Upload Photo
                            </div>
                        </div>
                        <div className="">
                            <h5 className="font-semibold text-[14px] sm:text-[16px] text-black mb-1 text-left">
                                {name}
                            </h5>
                            <h5 className="text-[12px] sm:text-[16px] text-black mb-1 font-medium text-left">
                                {/* {role_id === 1 ? 'UI/UX Designer' : 'Other Role'} Replace with actual role mapping */}
                            </h5>
                            {experience.length > 0 && (
                                <>
                                    <h6 className="text-[12px] sm:text-sm text-[#4D4D4F] mb-2">
                                        {experience[0].company_name}{" "}
                                        <GoDotFill className="inline-block size-3"/>{" "}
                                        {experience[0].job_type_name}
                                    </h6>
                                    <h6 className="text-[12px] sm:text-sm text-[#4D4D4F]">
                                        Selected job roles:
                                    </h6>
                                    {experience.map((exp, i) => (
                                        <h6
                                            key={i}
                                            className="text-[12px] sm:text-sm font-medium mb-2 inline mr-2"
                                        >
                                            <GoDotFill className="inline-block size-3"/>{" "}
                                            {exp.designation_name}
                                        </h6>
                                    ))}
                                </>
                            )}
                            <div className="flex gap-1 text-[#4D4D4F] text-[12px] sm:text-sm mt-2">
                                Skills{" "}
                                <span className="size-5 bg-[#F9D1D7] rounded-full text-center">
                      {skills?.length || 0}
                    </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 my-4">
                        <input
                            type="checkbox"
                            name="whatsapp_consent"
                            className="!mb-0 !mt-1 cursor-pointer !flex-shrink-0 block !w-4 !h-auto wc-check"
                            id="whatsapp_consent"
                            checked={WAConsent}
                            onChange={(e) => {
                                // Update the Redux store or state for WhatsApp consent
                                setWAConsent(!WAConsent);
                            }}
                        />
                        <label
                            className="!mb-0 inline-block text-[12px]"
                            htmlFor="whatsapp_consent"
                        >
                            I consent to share my number with the recruiter for connecting
                            with me via
                            <Image
                                src={whatsAppIcon}
                                alt="whatsapp-icon"
                                className="w-[70px] h-[16px] inline ml-2"
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
                                className="!mb-0 inline-block text-[#4D4D4F] whitespace-nowrap text-[12px]"
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
                {/* @ts-ignore */}
                <div className={`p-0 pb-6 mt-[44px] flex justify-center ${
                    size === "md" ? "max-w-[528px] mx-auto" : "px-0"
                }`}>
                    <button
                        className={`${styles.onboarding_dialog_btn} w-full flex-shrink-0 justify-start bg-red text-white px-4 py-2 ${
                            isSubmitting || !tncChecked
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={isSubmitting || !tncChecked}
                        type="submit"
                    >
                        Explore Kaabil
                    </button>
                </div>
            </form>
        </div>
    );
}
