"use client";
import React, { useEffect, useState } from "react";
import { SingleValue, ActionMeta } from 'react-select';
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
import { optionType } from "@/Types/common";

const EducationModal = ({ size }: any) => {
  const { educationModal, qualificationList, profileData, educationData } =
    useAppSelector((state) => state.profile);

  console.log(educationData, "Please check Education Data");
  const [educationSearch, setEducationSearch] = useState(educationData);
  const [showEducation, setShowEducation] = useState(false);

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(
    profileData,
    qualificationList,
    "Check ProfileData More And More"
  );

  const validationSchema = Yup.object().shape({
    education_id: Yup.string().required("Required"),
    user_certification: Yup.mixed()
      .test(
        "fileCount",
        "You can only upload up to 6 files.",
        (value: any) => !value || value.length <= 6
      )
      .nullable(),
    year_of_graduation: Yup.string().required("Required"),
    institute_name: Yup.string().when("isInstitute", {
      is: true,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const closeModal = () => {
    setShowEducation(false);
    dispatch(setEducationModal(false));
  };

  useEffect(() => {
    dispatch(fetchEducationDetail());
  }, []);

  useEffect(() => {
    const education = qualificationList.find((education: any) => education?.name === profileData?.education_name)
    getFieldStudy(education)
  }, [qualificationList]);

  const getFieldStudy = (education: any) => {
    console.log(education, "Verify Education over here");
    if (education?.is_field_study_show !== "0") {
      dispatch(fieldStudy({ data: { education_master_id: education?.id } }));
    }
  };

  return (
    // Suppressing Dialog type error
    <>
        {educationModal && size ==="xxl" && <div className="overlay h-screen w-screen fixed z-[1000] bg-[#000000E5] opacity-70 inset-0"></div>}
    
     {/* @ts-ignore */}
    <Dialog
      open={educationModal}
      handler={closeModal}
      size={size}
      className={`${
        size === "xxl"
          ? "top-14 mx-auto fixed bottom-0 rounded-2xl sm-dailog"
          : "fixed -top-20 -translate-x-1/2 custom-dialog"
      }`}
    >
      <div>
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-0 right-0 cursor-pointer"
              size={size === "md" ? 36 : 28}
              onClick={closeModal}
            />
            <div
              className={`flex items-center mt-6 ${
                size === "xxl"
                  ? "justify-start text-md"
                  : "justify-center text-3xl"
              }`}
            >
              <h2 className="text-center text-[#231F20] font-semibold">
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
            institute_name:
              profileData?.educations?.length > 0
                ? profileData?.educations[0]?.field_of_study
                : "",
            user_certification: null,
            year_of_graduation:
              profileData?.educations?.length > 0
                ? profileData?.educations[0]?.year_of_graduation
                : null,
            institute_master_id:
              qualificationList?.find(
                (item: any) => item?.name === profileData?.education_name
              )?.id || "",
            certification: profileData.user_certifications,
            user_certification_title: [""],
            isInstitute:
              qualificationList?.find(
                (item: any) => item?.name === profileData?.education_name
              )?.is_field_study_show === "0"
                ? false
                : true,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values: any) => {
            console.log(values, "From Submit Or Not");
            const formData = new FormData();
            const data: any = [
              {
                id: values.education_id,
                institute_name: values?.institute_name,
                institute_master_id: "",
                field_of_study_master_id: values?.institute_master_id,
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
              "user_certification_title",
              JSON.stringify(values.user_certification_title)
            );
            if (values?.user_certification !== null) {
              formData.append(
                "user_certification[]",
                values?.user_certification[0]
              );
            }
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
              await closeModal();
            }
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty, errors }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody
                className={`p-0 max-h-[calc(100vh_-_225px)] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll ${
                  size === "xxl" ? "mt-4" : "mt-8"
                }`}
              >
                <div
                  className={`${
                    size === "xxl" ? "px-4" : "px-12"
                  } space-y-2 pb-8`}
                >
                  <label
                    className={`block font-semibold mb-1 !text-[#231F20] ${
                      size === "xxl" ? "!text-[16px]" : "!text-xl"
                    }`}
                    htmlFor="fileInput"
                  >
                    What is your highest level of education?
                  </label>
                  <div
                    className={`relative flex flex-col gap-2 w-full bg-white rounded-lg ${
                      size === "xxl" ? "py-1" : "py-2"
                    }`}
                  >
                    {qualificationList?.map((education: any) => (
                      <div
                        key={education.id}
                        className={`${
                          education.id === values.education_id
                            ? "border-2 border-red px-6"
                            : ""
                        }  ${size === "xxl" ? "py-1" : "py-2"} rounded-lg`}
                      >
                        <label
                          htmlFor={education.id}
                          onClick={async () => {
                            await setFieldValue(
                              "isInstitute",
                              education?.is_field_study_show !== "0"
                            );
                            setFieldValue("year_of_graduation", null);
                            setFieldValue("education_id", education.id);
                            setFieldValue("institute_name", "");
                            // dispatch(
                            //   fieldStudy({
                            //     data: {
                            //       education_master_id: values?.education_id,
                            //     },
                            //   })
                            // );
                            setShowEducation(false);
                            setEducationSearch([]);
                            getFieldStudy(education);

                            // setFieldValue("institute_name", "");
                          }}
                          className={`form-group flex items-center gap-4 rounded-lg  py-3 cursor-pointer ${
                            education.id === values.education_id
                              ? "px-0"
                              : "border shadow-sm px-5"
                          } `}
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
                            <span
                              className={`text-[#231F20] ${
                                size === "xxl" ? "text-[16px]" : "text-xl"
                              }`}
                            >
                              {education.name}
                            </span>
                          </div>
                        </label>
                        {education.id === values.education_id &&
                          education?.is_field_study_show !== "0" && (
                            <>
                            {/* {JSON.stringify(educationData)} */}
                            <EducationSelect selectedValue={{value:values.institute_master_id, label:values.institute_name}} educationData={educationData} setFieldValue={setFieldValue}  />
                              {/* <div className="w-full relative flex items-center">
                                <input
                                  className="px-10 bg-[#C8C9CB3B] w-full py-3 rounded-lg placeholder-[#231F20] text-[#231F20]"
                                  placeholder="Select Education"
                                  value={values?.institute_name}
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    // If input is empty, set institute_name to null; otherwise, set the value
                                    setFieldValue(
                                      "institute_name",
                                      value.length === 0 ? null : value
                                    );

                                    // Filter suggestions based on the input
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
                                      <div className="absolute top-16 z-50 w-full max-h-[250px] min-h-[40px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                                        {educationSearch?.map((item: any) => (
                                          <div
                                            key={item.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                              setFieldValue(
                                                "institute_name",
                                                item.name
                                              );
                                              setFieldValue(
                                                "institute_master_id",
                                                item?.id
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
                              </div> */}
                              <div className="h-3 mb-4">
                                <ErrorMessage
                                  name="institute_name"
                                  component="div"
                                  className="text-red text-md mt-1"
                                />
                              </div>
                            </>
                          )}
                        {education?.id === values?.education_id && (
                          <div>
                            <Select
                              placeholder="year of passing"
                              styles={customStyles}
                              options={yearOfPassingOptions}
                              onChange={(option) => {
                                setFieldValue(
                                  "year_of_graduation",
                                  option?.value
                                );
                              }}
                              value={
                                yearOfPassingOptions?.find(
                                  (item) =>
                                    item?.value ===
                                    Number(values?.year_of_graduation)
                                ) || null
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
                      className={`block font-semibold mb-1 !text-[#231F20] ${
                        size === "xxl" ? "!text-[16px]" : "!text-xl"
                      }`}
                      htmlFor="fileInput"
                    >
                      Certification
                    </label>
                    <div className="col-span-12 mt-2 flex gap-3 flex-wrap">
                      {values?.certification?.length > 0 ? (
                        values?.certification.map(
                          (
                            cert: {
                              id: string;
                              media_url: string;
                              user_certification_title: string;
                              attachment_type: string;
                            },
                            index: number
                          ) => (
                            <div
                              key={cert.id}
                              className="certification-card text-center"
                            >
                              {cert.attachment_type === "2" ? (
                                <a
                                  href={cert.media_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center"
                                >
                                  <img
                                    src="/new-assets/icons/pdf_logo (1).png"
                                    className={`${
                                      size === "xxl" ? "h-20 w-20" : "h-24 w-24"
                                    } object-cover rounded-md light-shadow`}
                                    alt={
                                      cert.user_certification_title ||
                                      "Certificate"
                                    }
                                  />
                                  <h1 className="text-xs mt-2 text-[#231F20]">
                                    {cert.user_certification_title ||
                                      "PDF Certification"}
                                  </h1>
                                </a>
                              ) : (
                                <div className="cursor-pointer">
                                  <img
                                    src={cert.media_url}
                                    alt={
                                      cert.user_certification_title ||
                                      "Certificate"
                                    }
                                    className={`${
                                      size === "xxl" ? "h-20 w-20" : "h-24 w-24"
                                    } object-cover rounded-md`}
                                  />
                                  <h1 className="text-xs mt-2 text-[#231F20]">
                                    {cert.user_certification_title ||
                                      "Untitled Certification"}
                                  </h1>
                                </div>
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                    <div className="flex gap-4 mt-2 pb-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={(e: any) => {
                            const files: any = Array.from(e.target.files);
                            if (files.length > 6) {
                              e.target.value = ""; // Reset the input if limit exceeded
                            } else {
                              setFieldValue("user_certification_title", [
                                files[0]?.name,
                              ]);
                              console.log(files, "File Name Was Present");
                              const newCertifications = files?.map(
                                (file: any, index: any) => ({
                                  id: `new-${index}-${file.name}`, // Generate a temporary ID
                                  media_url: URL.createObjectURL(file), // Create a preview URL
                                  user_certification_title: file.name,
                                  attachment_type: file.type.includes("pdf")
                                    ? "2"
                                    : "1", // PDF = "2", else image = "1"
                                })
                              );
                              setFieldValue("certification", [
                                ...(values.certification || []),
                                ...newCertifications,
                              ]);
                              // setFieldValue("");
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
              <DialogFooter
                className={`flex justify-end p-0 pb-3 ${
                  size === "xxl" ? "px-4 mt-2" : "px-12 mt-4"
                }`}
              >
                <button
                  type="submit"
                  className={`px-28   bg-[#E31837] text-white rounded-xl ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  } ${size === "xxl" ? "py-3" : "py-4"}`}
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
    </>
  );
};


interface EducationOption {
  value: string;
  label: string;
}

interface selectedValue {
  value: string;
  label: string;
}

interface EducationSelectProps {
  selectedValue: selectedValue;
  setFieldValue: (field: string, value: any) => void;
  educationData: Array<{
    id: string;
    name: string;
  }>;
}

const EducationSelect: React.FC<EducationSelectProps> = ({ 
  selectedValue, 
  setFieldValue, 
  educationData 
}) => {
  const options: EducationOption[] = educationData?.map((item) => ({
    value: item.id,
    label: item.name
  }));
  
  const handleChange = (
    selected: SingleValue<EducationOption>,
    actionMeta: ActionMeta<EducationOption>
  ) => {
    setFieldValue("institute_name", selected?.label || null);
    setFieldValue("institute_master_id", selected?.value || null);
  };

  
  return (
    <>
    {/* {JSON.stringify(educationData)} */}
    <Select<EducationOption>
      options={options}
      placeholder="Select Education"
      value={selectedValue}
      onChange={handleChange}
      styles={{
        control: (base) => ({
          ...base,
          paddingLeft: '40px',
          backgroundColor: '#C8C9CB3B',
          border: 'none',
          borderRadius: '0.5rem',
          minHeight: '48px'
        }),
        placeholder: (base) => ({
          ...base,
          color: '#231F20'
        }),
        input: (base) => ({
          ...base,
          color: '#231F20'
        })
      }}
      components={{
        DropdownIndicator: () => (
          <img 
            src="/new-assets/icons/search.svg" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            alt="Search"
          />
        ),
        IndicatorSeparator: () => null
      }}
    />
    </>
  );
};
export default EducationModal;
