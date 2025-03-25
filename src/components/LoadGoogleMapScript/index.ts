'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAutocompleteService, setScriptLoaded } from '@/redux/searchSlice';
import { getSessionData } from '../utils/deviceId';
import api from '@/Services/Apiservice';
import { useAppSelector } from '@/redux/hooks';
import { setUserDesignation, setUserName, setUserPhotoUrl, setUserProfilePercentage, setUserSkills } from '@/redux/userSlice';

export default function LoadGoogleMapsScript() {
  const dispatch = useDispatch();
  const {token} = useAppSelector((state) => state.auth);
  const {id, isLoggedIn} = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   // Load Google Maps script
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCp-H598wbMhBWMz9I_zbvdcknH-fiBVCo&libraries=places`;
  //   script.async = true;
  //   script.onload = () => {
  //     // Initialize the autocomplete service
  //     const autocompleteService = new window.google.maps.places.AutocompleteService();
  //     dispatch(setAutocompleteService(autocompleteService)); // Store in Redux
  //     dispatch(setScriptLoaded(true)); // Mark script as loaded
  //   };
  //   document.body.appendChild(script);

  //   // Cleanup
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [dispatch]);

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        console.log('user skills')
        const { deviceId, secret, salt } = getSessionData();
        // Ensure session data is available
        if (!deviceId || !secret || !salt) {
          console.log("Session data not available, retrying...");
          setTimeout(fetchUserSkills, 1000); // Retry after 1 second
          return;
        }

        if(isLoggedIn){
          const response = await api.get("/Company/getDynamicJobseekerRow");
          console.log(response,"👍👍👍👍👍👍");
          let skills = response.data?.user_profile?.[0]?.skills
          dispatch(setUserSkills(skills))
          dispatch(setUserName(response.data?.user_profile?.[0]?.name))
          dispatch(setUserSkills(response.data?.user_profile?.[0]?.skills))
          dispatch(setUserDesignation(response.data?.user_profile?.[0]?.designation))
          dispatch(setUserProfilePercentage(response.data?.user_profile?.[0]?.user_profile_percentage))
          dispatch(setUserPhotoUrl(response.data?.user_profile?.[0]?.photo_url))
        }
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };
    fetchUserSkills();

    }, [dispatch, id]);

  return null; // This component doesn't render anything
}