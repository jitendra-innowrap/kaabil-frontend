import MultiSelect from '@/components/Inputs/MultiSelect';
import SelectedChips from '@/components/Inputs/SelectedChips';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useEffect, useState } from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import api from '@/Services/Apiservice';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { setUserLocation } from '@/redux/userSlice';

export default function AddLocation() {
  const progress = useAppSelector((state) => state.progress.value);
  const {current_location, location_id} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [locationList, setLocationList] = useState<{ value: string; label: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string; [key: string]: any }[]>([]);

  useEffect(() => {
    fetchLocation();
  }, []);

  // Initialize selectedLocation with user's existing location
  useEffect(() => {
    if (location_id) {
      const initialLocations = locationList.filter((loc) =>
        location_id.includes(loc.value)
      );
      setSelectedLocation(initialLocations);
      formik.setFieldValue("location_id", initialLocations.map((loc) => loc.value));
    }
  }, [current_location, locationList]);

  const fetchLocation = async () => {
    try {
      const response = await api.get("/MasterData/getCity");
      const locations = response?.data?.result?.map((loc: any) => ({
        value: loc.id,
        label: loc.name,
        ...loc,
      })) || [];
      setLocationList(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    location_id: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one location")
      .required("Location is required"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: {
      location_id: [] as string[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...current_location,
          is_willing_to_relocate: 1,
          user_willing_to_relocate: selectedLocation.map((location) => ({
            id: location.value,
            location: location.label,
            latitude: location.latitude,
            longitude: location.longitude,
          })),
        }
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          if(typeof value !== 'string'){
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString ); // Convert all values to strings
          }
        });
        // ✅ Submit selected locations
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.code === 1) {
          dispatch(setProgress(8));
          dispatch(setUserLocation(values.location_id));
          toast.success("Job location submitted successfully!", { position: "bottom-right" });
        } else {
          toast.error(response?.data?.message || "Submission failed!", { position: "bottom-right" });
        }
      } catch (error: any) {
        console.error("Error submitting job location:", error);
        toast.error(error?.message || "Something went wrong!", { position: "bottom-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLocation = (selectedOptions: { value: string; label: string }[]) => {
    setSelectedLocation(selectedOptions); // Update selectedLocation state
    formik.setFieldValue("location_id", selectedOptions.map((loc) => loc.value)); // Sync with formik
  };

  const handleRemoveLocation = (value: string) => {
    const updatedLocations = selectedLocation.filter((loc) => loc.value !== value);
    setSelectedLocation(updatedLocations); // Update selectedLocation state
    formik.setFieldValue("location_id", updatedLocations.map((loc) => loc.value)); // Sync with formik
  };

  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[36px]'>
        <span className='text-red'>Where</span> do you want to work?
      </h2>
      <form onSubmit={formik.handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>Select job location</h4>
        <div className="my-4">
          <MultiSelect
            options={locationList}
            placeholder="Job location"
            isMulti
            onChange={handleLocation}
            selectedValues={selectedLocation}
            icon={<RiMapPin2Line className='absolute left-[15px] top-[20px] size-4 text-[#808080]' />}
          />
        </div>
        <SelectedChips
          selectedValues={selectedLocation}
          onRemove={handleRemoveLocation}
        />

        <div className="flex w-full justify-between items-end">
          <div className="whitespace-nowrap"><span className='text-red'>{progress - 4}</span> - 6</div>
          <button className={`max-w-[100px] sm:max-w-[250px]`} disabled={formik.isSubmitting} type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}