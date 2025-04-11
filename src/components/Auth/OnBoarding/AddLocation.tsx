import MultiSelect from "@/components/Inputs/MultiSelect";
import SelectedChips from "@/components/Inputs/SelectedChips";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import React, { useEffect, useState } from "react";
import { RiMapPin2Line } from "react-icons/ri";
import api from "@/Services/Apiservice";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { setUserLocation } from "@/redux/userSlice";
import styles from "../SignIn/signIn.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function AddLocation({ size, closePopup, handleBack }: any) {
  const progress = useAppSelector((state) => state.progress.value);
  const { current_location, location_id } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [locationList, setLocationList] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<
    { value: string; label: string; [key: string]: any }[]
  >([]);

  useEffect(() => {
    fetchLocation();
  }, [progress == 7]);

  // Initialize selectedLocation with user's existing location
  useEffect(() => {
    if (location_id) {
      const initialLocations = locationList.filter((loc) =>
        location_id.includes(loc.value)
      );
      setSelectedLocation(initialLocations);
      formik.setFieldValue(
        "location_id",
        initialLocations.map((loc) => loc.value)
      );
    }
  }, [current_location, locationList, progress == 7]);

  const fetchLocation = async () => {
    try {
      const response = await api.get("/MasterData/getCity");
      const locations =
        response?.data?.result?.map((loc: any) => ({
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
        };
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value !== "string") {
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString); // Convert all values to strings
          }
        });
        // ✅ Submit selected locations
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.code === 1) {
          dispatch(setProgress(8));
          dispatch(setUserLocation(values.location_id));
          toast.success("Job location submitted successfully!", {
            position: "bottom-right",
          });
        } else {
          toast.error(response?.data?.message || "Submission failed!", {
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        console.error("Error submitting job location:", error);
        toast.error(error?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLocation = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    setSelectedLocation(selectedOptions); // Update selectedLocation state
    formik.setFieldValue(
      "location_id",
      selectedOptions.map((loc) => loc.value)
    ); // Sync with formik
  };

  const handleRemoveLocation = (value: string) => {
    const updatedLocations = selectedLocation.filter(
      (loc) => loc.value !== value
    );
    setSelectedLocation(updatedLocations); // Update selectedLocation state
    formik.setFieldValue(
      "location_id",
      updatedLocations.map((loc) => loc.value)
    ); // Sync with formik
  };

  return (
    <div className={`pb-6 sm:p-6 ${styles.formscrollitem}`}>
      <div className="relative w-full">
        <div onClick={handleBack}>
          <FaArrowLeft className="absolute cursor-pointer top-2 z-30 left-2 size-6" />
        </div>
        <IoClose
          className="absolute top-2 right-2 cursor-pointer"
          size={size === "md" ? 32 : 28}
          onClick={closePopup}
        />
        <div
          className={`flex sm:justify-center items-center pt-[74px] sm:pt-[30px] mb-[27px] sm:mb-0`}
        >
          <h2
            className={`text-[#231F20] font-semibold  ${
              size === "md"
                ? "!text-[28px] text-center"
                : "!text-[20px] text-start"
            }`}
          >
            <span className="text-red">Where {""}</span>
            <span className={`text-[#231F20]`}>
              do you want <br /> to work?
            </span>
          </h2>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={`${size === "md" ? "block mt-6" : "mt-2"}`}
      >
        <div
          className={`cursor-pointer ${
            size === "md" ? "max-w-[528px] mx-auto mb-[60px]" : "px-0"
          }`}
        >
          <h4 className="text-[14px] sm:text-lg font-medium text-[#231F20]">
            Select job location
          </h4>
          <div className="my-2 px-1 multi-select">
            <MultiSelect
              options={locationList}
              placeholder="Job location"
              isMulti
              onChange={handleLocation}
              selectedValues={selectedLocation}
              icon={
                <RiMapPin2Line className="absolute left-[15px] top-[14px] sm:top-[20px] size-4 text-[#808080]" />
              }
            />
          </div>
          <SelectedChips
            size={size}
            selectedValues={selectedLocation}
            onRemove={handleRemoveLocation}
          />
        </div>

        {/* @ts-ignore */}
        <div className="p-0 pb-6  mt-5 flex justify-center">
          <div className="flex w-full justify-end sm:justify-between items-end">
            <div className="whitespace-nowrap dialog-footer-paging">
              <span className="text-red">{progress - 4}</span> - 6
            </div>
            <button
              // className={`max-w-[100px] sm:max-w-[250px]`}
              disabled={formik.isSubmitting}
              type="submit"
              className={`dialog-action-btn font-semibold max-w-[200px] w-[160px] sm:w-[250px] ${
                formik.isValid
                  ? "bg-red text-white"
                  : "!opacity-50 !cursor-default"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
