"use client";
import React, { useEffect, useState } from "react";
import MultiSelect from "@/components/Inputs/MultiSelect";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileModal, setResumeModal } from "@/redux/profileSlice";
import Select from "react-select";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { RiMapPin2Line } from "react-icons/ri";
import api from "@/Services/Apiservice";
import { FaChevronDown } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import SelectedChips from "../Inputs/SelectedChips";

const ProfileModal = () => {
  const { profileModal } = useAppSelector((state) => state.profile);
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
    if (location_id) {
      const initialLocations = locationList.filter((loc) =>
        location_id.includes(loc.value)
      );
      setSelectedLocation(initialLocations);
      // formik.setFieldValue(
      //   "location_id",
      //   initialLocations.map((loc) => loc.value)
      // );
    }
  }, [current_location, locationList]);

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

  const handleLocation = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    setSelectedLocation(selectedOptions); // Update selectedLocation state
    // formik.setFieldValue(
    //   "location_id",
    //   selectedOptions.map((loc) => loc.value)
    // ); // Sync with formik
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const initialValues = {
    fullName: "",
    dob: "",
    jobRolePreference: "",
    jobType: "Full Time",
    jobLocation: "",
    skills: "",
    strengths: "",
  };

  const options = [
    { value: "new_york", label: "New York" },
    { value: "los_angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "miami", label: "Miami" },
  ];

  const customSingleOption = (props: {
    data: any;
    innerRef: any;
    innerProps: any;
  }) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
      >
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <span>{data.label}</span>
      </div>
    );
  };

  const customMultiValueLabel = (props: { data: any }) => {
    const { data } = props;
    return (
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-gray-500 mr-1" />
        <span>{data.label}</span>
      </div>
    );
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      paddingLeft: "0.5rem", // Extra padding for better spacing
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#f0f0f0",
    }),
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
    jobRolePreference: Yup.string().required("Required"),
    jobType: Yup.string().required("Required"),
    jobLocation: Yup.string().required("Required"),
    skills: Yup.string().required("Required"),
    strengths: Yup.string().required("Required"),
  });

  const closePopup = () => {
    dispatch(setProfileModal(false));
  };

  const handleRemoveLocation = (value: string) => {
    const updatedLocations = selectedLocation.filter(
      (loc) => loc.value !== value
    );
    setSelectedLocation(updatedLocations); // Update selectedLocation state
    // formik.setFieldValue(
    //   "location_id",
    //   updatedLocations.map((loc) => loc.value)
    // ); // Sync with formik
  };

  return (
    // @ts-ignore
    <Dialog
      open={profileModal}
      handler={closePopup}
      size="md"
      className="fixed top-0 -translate-x-1/2 custom-dialog"
    >
      <div>
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-0 right-0 cursor-pointer"
              size={38}
              onClick={closePopup}
            />
            <div className="flex justify-center items-center mt-6">
              <h2 className="text-center text-[#231F20] text-3xl font-semibold">
                Edit your <span className="text-red">profile</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0  max-h-[70vh] overflow-y-auto custom-scroll">
                <div className="px-12 space-y-2">
                  <div className="flex gap-4 items-center">
                    <Image
                      className="cursor-pointer rounded-full w-28 h-28"
                      src={"/new-assets/icons/avatar.svg"}
                      width={80}
                      height={80}
                      alt="profile-avatar"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="bg-black text-white text-lg px-4 py-2 rounded-md hover:bg-black"
                      >
                        Change Picture
                      </button>
                      <button
                        type="button"
                        className="border-2 border-black text-lg px-4 py-2 rounded-md"
                      >
                        Delete Picture
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-lg font-medium text-[#231F20]">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      className="w-full border pl-4 py-3 rounded-md bg-[#F2F3F3]"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium">
                      Date of Birth
                    </label>
                    <Field
                      type="date"
                      name="dob"
                      className="w-full border p-3 rounded-md"
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-500 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium">
                      Job Role Preference
                    </label>
                    <div className="shadow-md rounded-lg">
                      <div className="py-3 px-4 flex justify-between items-center">
                        Manage Design
                        <FaChevronDown className="size-3 text-[#333333] " />
                      </div>
                    </div>
                    <div className="inline-flex text-[#E31837] rounded-full py-1 px-5 mt-3 justify-between items-center gap-2 border-2 border-[#E31837]">
                      <span>UI Designer</span>
                      <div>X</div>
                    </div>
                    <ErrorMessage
                      name="jobRolePreference"
                      component="div"
                      className="text-red-500 text-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium">
                      Job Type
                    </label>
                    <div className="flex gap-3">
                      <div className="text-md rounded-full bg-red px-6 py-1 text-white flex items-center">
                        Full Time
                      </div>
                      <div className="text-md rounded-full text-black border-2 border-[#4D4D4F4D] px-6 py-1 flex items-center">
                        Part Time
                      </div>
                      <div className="text-md rounded-full text-black border-2 border-[#4D4D4F4D] px-6 py-1 flex items-center">
                        internship
                      </div>
                    </div>
                    <ErrorMessage
                      name="jobType"
                      component="div"
                      className="text-red-500 text-lg mt-1"
                    />
                  </div>
                  <label className="block text-lg font-medium !p-0">
                    Job Location
                  </label>
                  <div className="my-2">
                    <Select
                      options={options}
                      isMulti
                      placeholder="Select locations"
                      styles={customStyles}
                      components={{
                        Option: customSingleOption,
                        MultiValueLabel: customMultiValueLabel,
                      }}
                    />
                  </div>
                  <SelectedChips
                    selectedValues={selectedLocation}
                    onRemove={handleRemoveLocation}
                  />
                  <div>
                    <label className="block text-lg font-medium">Skills</label>
                    <Field
                      type="text"
                      name="skills"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter your skills"
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-red-500 text-lg mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium pb-2">
                      Strengths
                    </label>
                    <Field
                      type="text"
                      name="strengths"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter your strengths"
                    />
                    <ErrorMessage
                      name="strengths"
                      component="div"
                      className="text-red-500 text-lg mt-1"
                    />
                  </div>
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter className="flex justify-end p-0 pb-3 px-12 mt-3">
                <button
                  type="submit"
                  className={`px-28 py-4 bg-[#E31837] text-white rounded-xl ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default ProfileModal;
