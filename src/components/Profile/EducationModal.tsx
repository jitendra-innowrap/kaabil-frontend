"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchEducationDetail,
  fetchProfile,
  fieldStudy,
  setEducationModal,
  setEducationData,
  setResumeModal,
} from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import api from "@/Services/Apiservice";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles, yearOfPassingOptions } from "../utils";

const EducationModal = () => {
  const { educationModal, qualificationList, profileData, educationData } =
    useAppSelector((state) => state.profile);
  const [educationSearch, setEducationSearch] = useState(educationData);
  const [showEducation, setShowEducation] = useState(false);

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    education_id: Yup.string().required("Required"),
    user_certification: Yup.mixed()
      .test(
        "fileCount",
        "You can only upload up to 6 files.",
        (value: any) => !value || value?.length <= 6
      )
      .required("Required"),
    year_of_graduation: Yup.string().required("Required"),
  });
  const closeModal = () => {
    dispatch(setEducationModal(false));
  };

  useEffect(() => {
    setShowEducation(false);
    dispatch(fetchEducationDetail());
  }, []);

  useEffect(() => {
    dispatch(
      fieldStudy({
        data: {
          education_master_id: qualificationList?.find(
            (item: any) => item?.name === profileData?.education_name
          )?.id,
        },
      })
    );
  }, [qualificationList]);

  return (
    // Suppressing Dialog type error
    // @ts-ignore
    <Dialog
      open={educationModal}
      handler={closeModal}
      size="md"
      className="fixed -top-20 -translate-x-1/2 custom-dialog"
    >
      <div>
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-0 right-0 cursor-pointer"
              size={38}
              onClick={closeModal}
            />
            <div className="flex justify-center items-center mt-6">
              <h2 className="text-center text-[#231F20] text-3xl font-semibold">
                Edit your <span className="text-red">education</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={{
            education_id:
              qualificationList?.find(
                (item: any) => item?.name === profileData?.education_name
              )?.id || "",
            institute_name: "",
            user_certification: null,
            year_of_graduation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values: any) => {
            const formData = new FormData();
            const data: any = [
              {
                id: values.education_id,
                institute_name: values?.institute_name,
                institute_master_id: "",
                field_of_study_master_id: "",
                year_of_graduation: values?.year_of_graduation,
              },
            ];
            const certificationTitles = Array(
              values?.user_certification?.length || 0
            ).fill("");
            formData.append(
              "user_certification_title",
              JSON.stringify(certificationTitles)
            );
            formData.append(
              "user_certification[]",
              values?.user_certification[0]
            );
            formData.append("users_education", JSON.stringify(data));
            try {
              const response: any = await api.post(
                "/Auth/editJobSeekerPrpfile",
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );

              if (response.data.code === 1) {
                toast.success(response.data.msg, {
                  position: "bottom-right",
                });
              } else {
                toast.error(response.data.msg || "Failed To Update Profile", {
                  position: "bottom-right",
                });
              }
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
              closeModal();
            }
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0 mt-8 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
                <div className="px-12">
                  <label
                    className="block font-semibold mb-1 !text-[#231F20] !text-xl"
                    htmlFor="fileInput"
                  >
                    What is your highest level of education?
                  </label>
                  <div className="relative flex flex-col gap-2 w-full py-2 bg-white rounded-lg">
                    {qualificationList?.map((education: any) => (
                      <div
                        key={education.id}
                        className={`${
                          education.id === values.education_id &&
                          education?.is_field_study_show !== "0"
                            ? "border-2 border-red bg-[#FDF1F3]"
                            : ""
                        } py-2 rounded-lg px-4 ${
                          education.id === values.education_id
                            ? "bg-[#FDF1F3]"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor={education.id}
                          onClick={() => {
                            setFieldValue("education_id", education.id);
                            setFieldValue("institute_name", "");
                            dispatch(
                              fieldStudy({
                                data: {
                                  education_master_id: values?.education_id,
                                },
                              })
                            );
                            setShowEducation(false);
                            setEducationSearch([]);
                          }}
                          className={`form-group flex items-center gap-4 rounded-lg px-5 py-3 border shadow-sm cursor-pointer`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              id={education.id}
                              checked={education.id === values.education_id}
                              name="education"
                              className="cursor-pointer !m-0 !w-4 !h-4"
                              value={education.id}
                            />
                            <span className="text-[#231F20] text-xl">
                              {education.name}
                            </span>
                          </div>
                        </label>
                        {education.id === values.education_id &&
                          education?.is_field_study_show !== "0" && (
                            <>
                              <div className="w-full py-3 relative flex items-center mt-2">
                                <input
                                  className="px-10 bg-[#C8C9CB3B] w-full py-3 rounded-lg placeholder-[#231F20] text-[#231F20]"
                                  placeholder="BFA Applied Arts"
                                  value={values?.institute_name}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("institute_name", value);
                                    const filteredSuggestions =
                                      educationData?.filter((item: any) =>
                                        item?.name
                                          ?.toLowerCase()
                                          .includes(value.toLowerCase())
                                      );
                                    setEducationSearch(filteredSuggestions);
                                  }}
                                  onFocus={async () => {
                                    setShowEducation(true);
                                    await setEducationSearch(educationData);
                                  }}
                                />
                                <img
                                  src="/new-assets/icons/search.svg"
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#231F20] mt-0.5"
                                />
                                {educationSearch?.length > 0 &&
                                  showEducation && (
                                    <>
                                      <div className="absolute top-16 z-50 w-full max-h-[250px] min-h-[50px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                                        {educationSearch?.map((item: any) => (
                                          <div
                                            key={item.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                              setFieldValue(
                                                "institute_name",
                                                item.name
                                              );
                                              setShowEducation(false);
                                              setEducationSearch([]);
                                            }}
                                          >
                                            {item.name}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                              </div>
                              <div className="mt-1">
                                <Select
                                  placeholder="year of passing"
                                  styles={customStyles}
                                  options={yearOfPassingOptions}
                                  onChange={(option) =>
                                    setFieldValue(
                                      "year_of_graduation",
                                      option?.value
                                    )
                                  }
                                />
                                <div className="h-1 mb-4">
                                  <ErrorMessage
                                    name="year_of_graduation"
                                    component="div"
                                    className="text-red text-md mt-1"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="h-1">
                    <ErrorMessage
                      name="education_id"
                      component="div"
                      className="text-red text-sm mt-1"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      className="block font-semibold mb-1 !text-[#231F20] !text-xl"
                      htmlFor="fileInput"
                    >
                      Certification
                    </label>
                    <div className="flex gap-4 mt-2 pb-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept=".pdf,.doc,.docx,image/*,video/*"
                          onChange={(e: any) => {
                            const files = Array.from(e.target.files);
                            if (files.length > 6) {
                              e.target.value = ""; // Reset the input if limit exceeded
                            } else {
                              setFieldValue("user_certification", files);
                              console.log("Selected files:", files);
                              // Handle valid files here
                            }
                          }}
                        />
                        <img
                          src="/new-assets/icons/certificateImage.svg"
                          alt="Certificate Icon"
                        />
                        <div className="h-3">
                          <ErrorMessage
                            name="user_certification"
                            component="div"
                            className="text-red text-lg mt-1"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter className="flex justify-end p-0 pb-3 mt-3 px-12">
                <button
                  type="submit"
                  className={`px-28 py-4  bg-[#E31837] text-white rounded-xl ${
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

export default EducationModal;
