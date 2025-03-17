import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { GoDotFill } from 'react-icons/go';
import api from '@/Services/Apiservice';
import toast from 'react-hot-toast';
import { setUserIsProfileVerified, setUserPhotoUrl, setUserWAConsent } from '@/redux/userSlice';

interface prop {
  onClose: () => void;
}

export default function OnBoardingComplete({ onClose }: prop) {
  const progress = useAppSelector((state) => state.progress.value);
  const { experience, name, role_id, skills, photo_url, is_whatsapp_show } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [WAConsent, setWAConsent] = useState(is_whatsapp_show===false?false:true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
        formData.append('is_whatsapp_show', WAConsent?'1':'0'); // Append the file safely
        formData.append('is_profile_verify', '1'); // Append the file safely
        // Submit the form data
        const response = await api.post('/Auth/editJobSeekerPrpfile', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (response?.data?.code === 1) {
        toast.success('Profile updated successfully!', { position: 'bottom-right' });
        dispatch(setUserWAConsent(WAConsent))
        dispatch(setUserIsProfileVerified('1'))
        onClose(); // Close the modal or navigate to the next step
      } else {
        toast.error(response?.data?.message || 'Submission failed!', { position: 'bottom-right' });
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error?.message || 'Something went wrong!', { position: 'bottom-right' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) { // Ensure file is not undefined
      try {
        const formData = new FormData();
        formData.append('photo_url', file); // Append the file safely
        // Submit the form data
        const response = await api.post('/Auth/editJobSeekerPrpfile', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        if (response?.data?.code === 1) {
          toast.success('Profile updated successfully!', { position: 'bottom-right' });
          dispatch(setUserPhotoUrl(response.data.result?.[0]?.photo_url))
        } else {
          toast.error(response?.data?.message || 'Submission failed!', { position: 'bottom-right' });
        }
      } catch (error: any) {
        console.error('Error updating profile:', error);
        toast.error(error?.message || 'Something went wrong!', { position: 'bottom-right' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error('No file selected');
      toast.error('Please select a file before submitting.', { position: 'bottom-right' });
    }
    
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="">
      <h2 className="text-center font-semibold text-lg md:text-xl xl:text-[28px] xl:leading-[38px]">
        <span className="text-red">Congrats!</span> <br />
        Your profile is active
      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <div className="p-4 flex-col sm:flex-row rounded-lg border-[1.6px] border-[#E3ECFB] shadow-tertiary justify-start flex sm:gap-4">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={photo_url || '/new-assets/icons/avatar.svg'}
              alt="profile-photo"
              className="w-[75px] h-[75px] mr-1 rounded-full object-fit"
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
            <button
              type="button"
              onClick={handleUploadClick}
              className="!p-0 !rounded-full !text-[11px] !w-[87px] !h-6 !m-2 bg-red text-white"
            >
              Upload Photo
            </button>
          </div>
          <div className="">
            <h5 className="font-semibold text-black mb-1 text-center sm:text-left">{name}</h5>
            <h5 className="text-black mb-1 font-medium text-center sm:text-left">
              {/* {role_id === 1 ? 'UI/UX Designer' : 'Other Role'} Replace with actual role mapping */}
            </h5>
            {experience.length > 0 && (
              <>
                <h6 className="text-sm text-[#4D4D4F] mb-2">
                  {experience[0].company_name} <GoDotFill className="inline-block size-3" />{' '}
                  {experience[0].job_type_name}
                </h6>
                <h6 className="text-sm text-[#4D4D4F]">Selected job roles:</h6>
                {experience.map((exp, i) => (
                  <h6 key={i} className="text-sm font-medium mb-2 inline mr-2">
                    <GoDotFill className="inline-block size-3" /> {exp.designation_name}
                  </h6>
                ))}
              </>
            )}
            <div className="flex gap-1 text-[#4D4D4F] text-sm mt-2">
              Skills <span className="size-5 bg-[#F9D1D7] rounded-full text-center">{skills?.length || 0}</span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 my-4">
          <input
            type="checkbox"
            name="whatsapp_consent"
            className="!mb-0 !mt-1 cursor-pointer inline-block !w-4 !h-4"
            id="whatsapp_consent"
            checked={WAConsent}
            onChange={(e) => {
              // Update the Redux store or state for WhatsApp consent
              setWAConsent(!WAConsent)
            }}
          />
          <label className="!mb-0 inline-block" htmlFor="whatsapp_consent">
            I consent to share my number with the recruiter for connecting with me via
            <Image
              src={'/new-assets/icons/whatsapp.png'}
              alt="whatsapp-icon"
              className="w-[89px] h-[20px] inline ml-2"
              width={100}
              height={30}
            />
          </label>
        </div>
        <button
          className={`flex-shrink-0 justify-start bg-red text-white px-4 py-2 rounded`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
}