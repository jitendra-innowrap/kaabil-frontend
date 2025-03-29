"use client";
import React, { useEffect, useState } from "react";
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

const ProfileModal = () => {
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
  } = useAppSelector((state) => state.profile);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(rolesList, "Check Role List");

  const validationSchema = Yup.object().shape({
    photo_url: Yup.mixed().required("Required"),
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
    dispatch(fetchSkills({ data: {} }));
    // dispatch
  }, []);

  return (
    // @ts-ignore
    <Dialog
      open={profileModal}
      handler={closePopup}
      size="md"
      className="fixed -top-10 -translate-x-1/2 custom-dialog"
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
          initialValues={{
            photo_img: "/new-assets/icons/avatar.svg", //Exclude this
            photo_url: null,
            first_name: "",
            date_of_birth: formatDateExperience(new Date()),
            role_id: [],
            job_type_master_id: [],
            //  Location
            city: "",
            user_city: "",
            city_latitude: "",
            city_longitude: "",
            user_willing_to_relocate: [],
            is_willing_to_relocate: 1,
            selectedLocation: [], //exclude this
            //  Soft  Skills
            soft_skill: [], //Exclude this
            user_soft_skill: [],
            //  Skills
            skills: [], //Exclude this
            user_skill: [],
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
                key === "user_skill"
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
              closePopup();
            }
          }}
        >
          {({ setFieldValue, isSubmitting, values, errors }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0 max-h-[70vh] overflow-y-auto custom-scroll">
                <div className="px-12 space-y-2 pb-8">
                  {/* Field One */}
                  <div>
                    <div className="flex gap-4 items-center">
                      <Image
                        className="cursor-pointer rounded-full w-28 h-28"
                        src={values?.photo_img}
                        width={60}
                        height={60}
                        alt="profile-avatar"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="bg-[#231F20] text-white text-lg px-4 py-[13px] rounded-md hover:bg-[#231F20]"
                        >
                          <label
                            htmlFor="photoInput"
                            className="cursor-pointer text-lg"
                          >
                            Change Picture
                          </label>
                        </button>
                        <input
                          id="photoInput"
                          type="file"
                          accept="image/*"
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
                        <div
                          className="!border-2 flex gap-2 items-center cursor-pointer font-medium text-[#231F20] !bg-white !border-black text-lg px-4 rounded-md"
                          onClick={() => {
                            setFieldValue("photo_url", null);
                            setFieldValue(
                              "photo_img",
                              "/new-assets/icons/avatar.svg"
                            );
                          }}
                        >
                          <img
                            src="/new-assets/icons/delete-icon.svg"
                            className="h-8 w-8"
                          />
                          Delete Picture
                        </div>
                      </div>
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="photo_url"
                        component="div"
                        className="text-red-500 text-lg"
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
                      className="w-full border pl-4 py-3 rounded-lg bg-[#F2F3F3]"
                      placeholder="Enter your full name"
                    />
                    <div className="h-3">
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-lg"
                      />
                    </div>
                  </div>
                  {/* Field  Three */}
                  <div>
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={values.date_of_birth}
                      onChange={(e) => {
                        setFieldValue("date_of_birth", e.target.value);
                      }}
                      placeholder="Start Date"
                      className="mb-2 w-full px-3 py-3 border rounded-lg !bg-white shadow-md"
                      max={(() => {
                        const today = new Date();
                        return today.toISOString().split("T")[0];
                      })()}
                    />
                    <div className="h-3">
                      <ErrorMessage
                        name="date_of_birth"
                        component="div"
                        className="text-red-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 4 */}
                  <div className="">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Job role preference
                    </label>
                    <MultiSelect
                      options={rolesList}
                      placeholder="Select Job Role"
                      isMulti
                      onChange={(
                        selectedRoles: { value: string; label: string }[]
                      ) =>
                        setFieldValue(
                          "role_id",
                          selectedRoles.map((role) => role.value)
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
                            values.role_id?.filter((id) => id !== value)
                          )
                        }
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="role_id"
                        component="div"
                        className="text-red-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 5 */}
                  <div>
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Job type
                    </label>
                    <div className="grid sm:grid-cols-3 gap-3 3xl:gap-4 ">
                      {jobTypes.map((jobType: any) => (
                        <div
                          key={jobType.id}
                          className={`col-span-1 label-option cursor-pointer ${
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
                        className="text-red-500 text-lg"
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
                      placeholder="Select Job Role"
                      isMulti
                      onChange={async (
                        selectedLocation: { value: string; label: string }[]
                      ) => {
                        await setFieldValue(
                          "selectedLocation",
                          selectedLocation?.map((role) => role.value)
                        );
                        const selectedLocationValues = selectedLocation?.map(
                          (role) => role.value
                        );
                        const cityData = cityList?.filter((item: any) =>
                          selectedLocationValues?.includes(item?.id)
                        );
                        if (selectedLocation.length > 0) {
                          setFieldValue("city", cityData[0]?.id);
                          setFieldValue("user_city", cityData[0]?.name);
                          setFieldValue("city_latitude", cityData[0]?.latitude);
                          setFieldValue(
                            "city_longitude",
                            cityData[0]?.latitude
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
                        // @ts-ignore
                        values.selectedLocation?.includes(role.value)
                      )}
                    />
                    <div
                      className={
                        values.selectedLocation?.length > 0 ? "mt-4" : ""
                      }
                    >
                      <SelectedChips
                        selectedValues={locationList?.filter((role: any) =>
                          // @ts-ignore
                          values.selectedLocation?.includes(role.value)
                        )}
                        onRemove={async (value: string) => {
                          const updatedSelectedLocations =
                            values.selectedLocation?.filter(
                              (id) => id !== value
                            );
                          await setFieldValue(
                            "selectedLocation",
                            updatedSelectedLocations
                          );
                          const filteredCities = cityList?.filter((city: any) =>
                            // @ts-ignore
                            updatedSelectedLocations?.includes(city.id)
                          );
                          if (filteredCities.length > 0) {
                            await setFieldValue("city", filteredCities[0].id);
                            await setFieldValue(
                              "user_city",
                              filteredCities[0]?.name
                            );
                            await setFieldValue(
                              "city_latitude",
                              filteredCities[0]?.latitude
                            );
                            await setFieldValue(
                              "city_longitude",
                              filteredCities[0]?.longitude
                            );
                            await setFieldValue(
                              "user_willing_to_relocate",
                              filteredCities
                            );
                          } else {
                            // Clear the city-related fields if no cities remain
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
                        className="text-red-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Field 7 */}
                  <div className="skills-select">
                    <label className="block text-lg font-semibold text-[#231F20] mb-2">
                      Skills
                    </label>
                    <MultiSelect
                      options={skillsOption}
                      placeholder="Search your skills"
                      isMulti
                      onChange={(
                        skills: { value: string; label: string }[]
                      ) => {
                        setFieldValue(
                          "skills",
                          skills.map((skill) => skill.value)
                        );
                        const selectedSkillValues = skills?.map(
                          (item) => item.value
                        );
                        const skillsData = skillList?.filter((item: any) =>
                          selectedSkillValues?.includes(item?.id)
                        );
                        if (skillsData?.length > 0) {
                          setFieldValue("user_skill", skillsData);
                        } else {
                          setFieldValue("user_skill", []);
                        }
                      }}
                      selectedValues={skillsOption?.filter((role: any) =>
                        // @ts-ignore
                        values.skills.includes(role.value)
                      )}
                      icon={
                        <FaMagnifyingGlass className="absolute left-[15px] top-[20px] size-4 text-[#808080]" />
                      }
                    />
                    <div className={values.skills.length > 0 ? "mt-4" : ""}>
                      <SelectedChips
                        selectedValues={skillsOption?.filter((role: any) =>
                          // @ts-ignore
                          values.skills.includes(role.value)
                        )}
                        onRemove={(value: string) => {
                          const updatedSelectedSoftSkills =
                            values.skills?.filter((id) => id !== value);
                          setFieldValue("skills", updatedSelectedSoftSkills);
                          const filteredSoftSkills = skillList?.filter(
                            (skill: any) =>
                              // @ts-ignore
                              updatedSelectedSoftSkills?.includes(skill.id)
                          );
                          setFieldValue("user_skill", filteredSoftSkills);
                        }}
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="user_skill"
                        component="div"
                        className="text-red-500 text-lg"
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
                          selectedSoftSkills.map((role) => role.value)
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
                        <FaMagnifyingGlass className="absolute left-[15px] top-[20px] size-4 text-[#808080]" />
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
                            values.soft_skill?.filter((id) => id !== value);
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
                      />
                    </div>
                    <div className="h-4">
                      <ErrorMessage
                        name="user_soft_skill"
                        component="div"
                        className="text-red-500 text-lg"
                      />
                    </div>
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
