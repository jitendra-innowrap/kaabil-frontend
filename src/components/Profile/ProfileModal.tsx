"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchJobTypes,
  fetchLocation,
  fetchProfile,
  fetchRoles,
  fetchSkills,
  fetchSoftSkills,
  setProfileModal,
} from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { formatDateExperience } from "../utils";
import MultiSelect from "../Inputs/MultiSelect";
import api from "@/Services/Apiservice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SelectedChips from "../Inputs/SelectedChips";
import toast from "react-hot-toast";
import { RefreshProfileData } from "@/redux/userSlice";
import { RiMapPin2Line } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";

const ProfileModal = ({ size }: any) => {
  const {
    profileModal,
    rolesList,
    jobTypes,
    locationList,
    cityList,
    softSkillsOption,
    softSkills,
    skillsOption,
    skillList,
    profileData,
  } = useAppSelector((state) => state.profile);

  const { token } = useAppSelector((state) => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    photo_url: Yup.mixed(),
    first_name: Yup.string().required("Required"),
    date_of_birth: Yup.date().required("Required"),
    role_id: Yup.array()
      .of(Yup.string())
      .min(1, "Required")
      .max(2, "Max 2 Roles")
      .required("Required"),
    job_type_master_id: Yup.array()
      .of(Yup.string())
      .min(1, "Required")
      .required("Required"),
    user_willing_to_relocate: Yup.array()
      .min(1, "Required")
      .required("Required"),
    user_soft_skill: Yup.array().min(1, "Required").required("Required"),
    user_skill: Yup.array().min(1, "Required"),
  });

  const closePopup = () => {
    dispatch(setProfileModal(false));
  };

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchJobTypes());
    dispatch(fetchLocation());
    dispatch(fetchSoftSkills());

    if (profileData?.user_job_roles?.length > 0) {
      const departmentData = profileData.user_job_roles.map((item: any) => ({
        department_id: 0, // ✅ number format
        profession_id: item?.id,
      }));

      dispatch(
        fetchSkills({
          department_id: departmentData,
          search: "",
          page: 1,
        })
      );
    }
  }, [dispatch, profileData]);

  return (
    // @ts-ignore
    <Dialog
      open={profileModal}
      handler={closePopup}
      size={size}
      className={`${
        size === "xxl"
          ? "top-14 mx-auto fixed bottom-0 rounded-2xl sm-dailog"
          : "fixed -top-10 -translate-x-1/2 custom-dialog"
      }`}
    >
      <div>
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-0 right-0 cursor-pointer"
              size={size === "md" ? 36 : 28}
              onClick={closePopup}
            />
            <div
              className={`flex items-center mt-6 ${
                size === "xxl"
                  ? "justify-start text-md"
                  : "justify-center text-3xl"
              }`}
            >
              <h2 className="text-center text-[#231F20] font-semibold">
                Edit your <span className="text-red">profile</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={{
            photo_img: profileData?.photo_url || "/new-assets/icons/avatar.svg", //Exclude this
            photo_url: profileData?.photo_url || "",
            first_name:
              `${profileData?.first_name} ${profileData?.last_name}` || "",
            date_of_birth: profileData?.date_of_birth || "",
            role_id:
              profileData?.user_job_roles?.map((item: any) => item?.id) || [],
            job_type_master_id:
              profileData?.jobs_types?.map((item: any) => item?.id) || [],
            //  Location
            city: profileData?.city || "",
            user_city: profileData?.user_city || "",
            city_latitude: profileData?.city_latitude || "",
            city_longitude: profileData?.city_longitude || "",
            user_willing_to_relocate:
              profileData?.user_willing_to_relocate || [],
            is_willing_to_relocate: 1,
            selectedLocation:
              profileData?.user_willing_to_relocate?.map(
                (item: any) => item?.id
              ) || [], //exclude this
            //  Soft  Skills
            soft_skill:
              profileData?.soft_skills?.map((item: any) => item?.id) || [],
            user_soft_skill: profileData?.soft_skills || [],
            //  Skills
            skills: profileData?.skills?.map((item: any) => item?.id) || [],
            user_skill:
              profileData?.skills?.map(
                ({ skill_level_type, ...skill }: any) => ({
                  ...skill,
                  skill_level_type_id: "0",
                })
              ) || [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const {
              photo_img,
              skills,
              soft_skill,
              selectedLocation,
              ...payload
            } = values;
            const formData: any = new FormData();
            // Append payload key-value pairs to FormData
            Object.keys(payload)?.forEach((key: any) => {
              if (
                key === "user_willing_to_relocate" ||
                key === "user_soft_skill" ||
                key === "user_skill" ||
                key === "role_id" ||
                key === "job_type_master_id"
              ) {
                // Convert these keys' values to JSON strings
                // @ts-ignore
                formData.append(key, JSON.stringify(payload[key]));
              } else {
                // Append other keys as is
                // @ts-ignore
                formData.append(key, payload[key]);
              }
            });
            try {
              const response: any = await api.post(
                "/Auth/editJobSeekerPrpfile",
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );

              response.data.code === 1
                ? toast.success(response.data.msg, {
                    position: "bottom-right",
                  })
                : toast.error(response.data.msg || "Failed To Update Profile", {
                    position: "bottom-right",
                  });
            } catch (error: any) {
              toast.error(error?.message || "Something went wrong!", {
                position: "bottom-right",
              });
            } finally {
              await dispatch(
                fetchProfile({
                  token: token,
                  data: { latitude: 0, longitude: 0 },
                })
              );
              dispatch(RefreshProfileData());
              closePopup();
            }
          }}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
                <div
                  className={`${
                    size === "xxl" ? "px-4" : "px-12"
                  } space-y-2 pb-8`}
                >
                  {/* Field One */}
                  <div>
                    <div className="flex gap-4 items-center">
                      <Image
                        className={`cursor-pointer rounded-full object-cover ${
                          size === "xxl" ? "w-20 h-20" : "w-28 h-28"
                        }`}
                        src={values?.photo_img}
                        width={60}
                        height={60}
                        alt="profile-avatar"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={`bg-[#231F20] text-white px-4 rounded-md hover:bg-[#231F20] ${
                            size === "xxl" ? "py-[7px]" : "py-[13px]"
                          }`}
                        >
                          <label
                            htmlFor="photoInput"
                            className={`cursor-pointer ${
                              size === "xxl" ? "text-sm" : "text-xl"
                            }`}
                          >
                            Change Picture
                          </label>
                        </button>
                        <input
                          id="photoInput"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            const file: any = e.target.files?.[0];
                            if (file) {
                              setFieldValue("photo_url", file);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFieldValue(
                                  "photo_img",
                                  event.target?.result
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="photo_url"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>
                  {/* Field Two */}
                  <div className="mt-3">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      className={`w-full border pl-4 rounded-lg bg-[#F2F3F3] ${
                        size === "xxl" ? "py-2" : "py-3"
                      }`}
                      placeholder="Enter your full name"
                    />
                    <div className="h-3">
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>
                  {/* Field  Three */}
                  <div>
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Date of Birth
                    </label>
                    <div
                      className="relative w-full cursor-pointer"
                      onClick={() => inputRef.current?.showPicker()}
                    >
                      <input
                        ref={inputRef}
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={values.date_of_birth}
                        onChange={(e) =>
                          setFieldValue("date_of_birth", e.target.value)
                        }
                        placeholder="Start Date"
                        className={`custom-date-input mb-2 w-full pr-10 pl-3 cursor-pointer border rounded-lg !bg-white shadow-md appearance-none ${
                          size === "xxl" ? "py-2" : "py-3"
                        }`}
                        max={(() => {
                          const today = new Date();
                          return today.toISOString().split("T")[0];
                        })()}
                      />
                      <img
                        src="/new-assets/images/calendar2.svg"
                        className="absolute right-3 top-[45%] transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                      {/* <FaRegCalendarAlt  /> */}
                    </div>
                    <div className="h-3">
                      <ErrorMessage
                        name="date_of_birth"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 4 */}
                  <div className="role-preference">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Job role preference
                    </label>
                    <MultiSelect
                      options={rolesList}
                      placeholder="Select job role"
                      isMulti
                      onChange={(
                        selectedRoles: { value: string; label: string }[]
                      ) =>
                        setFieldValue(
                          "role_id",
                          selectedRoles?.map((role) => role.value)
                        )
                      }
                      selectedValues={rolesList?.filter((role: any) =>
                        // @ts-ignore
                        values.role_id.includes(role.value)
                      )}
                      maxSelections={2}
                    />
                    <div className={values.role_id.length > 0 ? "mt-4" : ""}>
                      <SelectedChips
                        selectedValues={rolesList?.filter((role: any) =>
                          // @ts-ignore
                          values.role_id.includes(role.value)
                        )}
                        onRemove={(value: string) =>
                          setFieldValue(
                            "role_id",
                            values.role_id?.filter((id: any) => id !== value)
                          )
                        }
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="role_id"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 5 */}
                  <div>
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Job type
                    </label>
                    <div className="flex flex-wrap gap-3 3xl:gap-4">
                      {jobTypes?.map((jobType: any) => (
                        <div
                          key={jobType.id}
                          className={`label-option cursor-pointer px-4 flex-grow py-2 rounded-md ${
                            values.job_type_master_id == jobType.id
                              ? "bg-red text-white"
                              : ""
                          }`}
                          onClick={() => {
                            setFieldValue("job_type_master_id", [jobType.id]);
                          }}
                        >
                          {jobType.name}
                        </div>
                      ))}
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="job_type_master_id"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 6 */}
                  <div className="job-role-select">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Job location
                    </label>
                    <MultiSelect
                      options={locationList}
                      placeholder="Select job location"
                      isMulti
                      onChange={async (
                        selectedLocation: { value: string; label: string }[]
                      ) => {
                        await setFieldValue(
                          "selectedLocation",
                          selectedLocation?.map((role) => role.value)
                        );
                        const selectedLocationValues = selectedLocation?.map(
                          (item) => item.value
                        );
                        const cityData = cityList?.filter((item: any) =>
                          selectedLocationValues?.includes(item?.id)
                        );
                        if (selectedLocation.length > 0) {
                          setFieldValue("city", cityData[0]?.location);
                          setFieldValue("user_city", cityData[0]?.location);
                          setFieldValue("city_latitude", cityData[0]?.latitude);
                          setFieldValue(
                            "city_longitude",
                            cityData[0]?.longitude
                          );
                          setFieldValue("user_willing_to_relocate", cityData);
                        } else {
                          setFieldValue("city", "");
                          setFieldValue("user_city", "");
                          setFieldValue("city_latitude", "");
                          setFieldValue("city_longitude", "");
                          setFieldValue("user_willing_to_relocate", []);
                        }
                      }}
                      selectedValues={locationList?.filter((role: any) =>
                        values.user_willing_to_relocate?.some(
                          (location: any) => location.location === role.label
                        )
                      )}
                      icon={
                        <RiMapPin2Line
                          className={`absolute left-[15px] ${
                            size === "xxl" ? "top-[14px]" : "top-[18px]"
                          } size-4 text-[#808080]`}
                        />
                      }
                    />
                    <div
                      className={
                        values.selectedLocation?.length > 0 ? "mt-4" : ""
                      }
                    >
                      <SelectedChips
                        selectedValues={locationList?.filter((role: any) =>
                          values.user_willing_to_relocate?.some(
                            (location: any) => location.location === role.label // Matching "Mumbai" with "Mumbai"
                          )
                        )}
                        onRemove={async (value: string) => {
                          // Step 1: Find the corresponding object in locationList
                          const locationToRemove = locationList?.find(
                            (loc: any) => loc.value === value
                          );
                          if (!locationToRemove) return;
                          const labelToRemove = locationToRemove.label;
                          // Step 2: Remove it from user_willing_to_relocate (based on label match)
                          const updatedUserWillingToRelocate =
                            values.user_willing_to_relocate?.filter(
                              (loc: any) => loc.location !== labelToRemove
                            );
                          // Step 3: Remove value from selectedLocation
                          const updatedSelectedLocations =
                            values.selectedLocation?.filter(
                              (id: any) => id !== value
                            );
                          await setFieldValue(
                            "selectedLocation",
                            updatedSelectedLocations
                          );
                          await setFieldValue(
                            "user_willing_to_relocate",
                            updatedUserWillingToRelocate
                          );
                          // Step 4: Update city fields based on new list
                          if (updatedUserWillingToRelocate.length > 0) {
                            const primaryCity = updatedUserWillingToRelocate[0];
                            console.log(
                              updatedUserWillingToRelocate,
                              "Verify It Please"
                            );
                            await setFieldValue("city", primaryCity.location);
                            await setFieldValue(
                              "user_city",
                              primaryCity.location
                            );
                            await setFieldValue(
                              "city_latitude",
                              primaryCity.latitude
                            );
                            await setFieldValue(
                              "city_longitude",
                              primaryCity.longitude
                            );
                            await setFieldValue(
                              "user_willing_to_relocate",
                              updatedUserWillingToRelocate
                            );
                          } else {
                            await setFieldValue("city", "");
                            await setFieldValue("user_city", "");
                            await setFieldValue("city_latitude", "");
                            await setFieldValue("city_longitude", "");
                            await setFieldValue("user_willing_to_relocate", []);
                          }
                        }}
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="user_willing_to_relocate"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>
                  {/* Field 7 */}
                  <div className="skills-select">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Skills
                    </label>
                    <MultiSelect
                      options={skillsOption} // Dynamically updated from API
                      placeholder="Search your skills"
                      isMulti
                      onInputChange={async (value: string) => {
                        if (value && values?.role_id?.length > 0) {
                          const departmentData = values.role_id.map(
                            (item: any) => ({
                              department_id: 0,
                              profession_id: item,
                            })
                          );
                          await dispatch(
                            fetchSkills({
                              department_id: departmentData,
                              search: value,
                              page: 1,
                            })
                          );
                        }
                      }}
                      onChange={(skills) => {
                        setFieldValue(
                          "skills",
                          skills?.map((skill) => skill.value)
                        );
                        const selectedSkillValues = skills?.map(
                          (item) => item.value
                        );
                        const skillsData = skillList?.filter((item: any) =>
                          selectedSkillValues?.includes(item?.id)
                        );
                        setFieldValue(
                          "user_skill",
                          skillsData?.length > 0 ? skillsData : []
                        );
                      }}
                      selectedValues={values?.user_skill?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      icon={
                        <FaMagnifyingGlass
                          className={`absolute left-[15px] ${
                            size === "xxl" ? "top-[14px]" : "top-[18px]"
                          } size-4 text-[#808080]`}
                        />
                      }
                    />
                    <div className={values.skills.length > 0 ? "mt-4" : ""}>
                      <SelectedChips
                        selectedValues={values?.user_skill?.map(
                          (item: any) => ({
                            value: item.id,
                            label: item.name,
                          })
                        )}
                        onRemove={(value: string) => {
                          const updatedSelectedSoftSkills =
                            values.skills?.filter((id: any) => id !== value);
                          setFieldValue("skills", updatedSelectedSoftSkills);
                          const filteredSoftSkills = skillList?.filter(
                            (skill: any) =>
                              // @ts-ignore
                              updatedSelectedSoftSkills?.includes(skill.id)
                          );
                          setFieldValue("user_skill", filteredSoftSkills);
                        }}
                        size={size}
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="user_skill"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>

                  {/* Filed 8 */}
                  <div className="skills-select">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Strengths
                    </label>
                    <MultiSelect
                      options={softSkillsOption}
                      placeholder="Search your Strengths"
                      isMulti
                      onChange={(
                        selectedSoftSkills: { value: string; label: string }[]
                      ) => {
                        setFieldValue(
                          "soft_skill",
                          selectedSoftSkills?.map((role) => role.value)
                        );
                        const selectedSoftSkillValues = selectedSoftSkills?.map(
                          (item) => item.value
                        );
                        const softSkillsData = softSkills?.filter((item: any) =>
                          selectedSoftSkillValues?.includes(item?.id)
                        );
                        if (softSkills?.length > 0) {
                          setFieldValue("user_soft_skill", softSkillsData);
                        } else {
                          setFieldValue("user_soft_skill", []);
                        }
                      }}
                      selectedValues={softSkillsOption?.filter((role: any) =>
                        // @ts-ignore
                        values.soft_skill.includes(role.value)
                      )}
                      icon={
                        <FaMagnifyingGlass
                          className={`absolute left-[15px] ${
                            size === "xxl" ? "top-[14px]" : "top-[18px]"
                          } size-4 text-[#808080]`}
                        />
                      }
                    />
                    <div className={values.soft_skill.length > 0 ? "mt-4" : ""}>
                      <SelectedChips
                        selectedValues={softSkillsOption?.filter((role: any) =>
                          // @ts-ignore
                          values.soft_skill.includes(role.value)
                        )}
                        onRemove={(value: string) => {
                          const updatedSelectedSoftSkills =
                            values.soft_skill?.filter(
                              (id: any) => id !== value
                            );
                          setFieldValue(
                            "soft_skill",
                            updatedSelectedSoftSkills
                          );
                          const filteredSoftSkills = softSkills?.filter(
                            (skill: any) =>
                              // @ts-ignore
                              updatedSelectedSoftSkills?.includes(skill.id)
                          );
                          setFieldValue("user_soft_skill", filteredSoftSkills);
                        }}
                        size={size}
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="user_soft_skill"
                        component="div"
                        className="text-red text-lg"
                      />
                    </div>
                  </div>
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter
                className={`flex justify-end p-0 pb-3 ${
                  size === "xxl" ? "px-4 mt-2" : "px-12 mt-4"
                }`}
              >
                <button
                  type="submit"
                  className={`px-28  bg-[#E31837] text-white rounded-xl ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  } ${size === "xxl" ? "py-2" : "py-4"}`}
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
