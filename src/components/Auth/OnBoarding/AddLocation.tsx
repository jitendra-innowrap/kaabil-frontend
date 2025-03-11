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
import { storeProgress } from '@/components/utils/deviceId';

export default function AddLocation() {
  const progress = useAppSelector((state) => state.progress.value);
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<{ value: string; label: string }[]>([]);
  const { location_id } = useAppSelector((state) => state.auth);  
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [locationList, setLocationList] = useState<{ value: string; label: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProgress(8));
  };

  const handleJobRoleChange = (selectedRoles: { value: string; label: string }[]) => {
    setLocation(selectedRoles);
  };

  const handleRemoveJobRole = (value: string) => {
    setLocation(prev => prev.filter(role => role.value !== value));
  };


  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await api.get("/MasterData/getCity");
      const locations = response?.data?.result?.map((loc: any) => ({
        value: loc.id,
        label: loc.name,
      })) || [];
       if (location_id?.length) {
        const preselectedLocations = locations.filter((loc:any) => location_id.includes(loc.value));
        setSelectedLocation(preselectedLocations);
      }
      setLocationList(locations);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  
   // ✅ Validation Schema
   const validationSchema = Yup.object().shape({
    location_id: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one location")
      .required("Location is required"),
    job_type_master_id: Yup.string().required("Please select a job type"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: {
      location_id: selectedLocation as string[]
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // ✅ Submit selected roles & job type
        const response = await api.post("/Auth/addJobseekerProfile", values);

        if (response?.data?.code === 1) {
          dispatch(setProgress(8));
          storeProgress(8);
          // setUserRole(values)
          // storeAuthUserDesiredRole(values)
          
          toast.success("Job role submitted successfully!", { position: "bottom-right" });
        } else {
          toast.error(response?.data?.message || "Submission failed!", { position: "bottom-right" });
        }
      } catch (error: any) {
        console.error("Error submitting job role:", error);
        toast.error(error?.message || "Something went wrong!", { position: "bottom-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });
  

  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[36px]'>
        <span className='text-red'>Where</span> do you want
        to work?
      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>Select job location</h4>
        <div className="my-4">
        <MultiSelect
          options={locationList}
          placeholder="Job location"
          isMulti
          onChange={(selectedLocation: { value: string; label: string }[]) =>
            formik.setFieldValue("location_id", selectedLocation.map((loc) => loc.value))
          }
          selectedValues={locationList.filter((loc) => formik.values.location_id.includes(loc.value))}
          icon={<RiMapPin2Line className='absolute left-[15px] top-[20px] size-4 text-[#808080]' />}
        />
        </div>
        <SelectedChips
          selectedValues={locationList.filter((loc) => formik.values.location_id.includes(loc.value))}
          onRemove={(value: string) =>
            formik.setFieldValue(
              "role_id",
              formik.values.location_id.filter((id) => id !== value)
            )
          }
        />

        <div className="flex w-full justify-between items-end">
          <div className="whitespace-nowrap"><span className='text-red'>{progress-4}</span> - 6</div>
          <button className={`max-w-[100px] sm:max-w-[250px]`} disabled={false} type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
