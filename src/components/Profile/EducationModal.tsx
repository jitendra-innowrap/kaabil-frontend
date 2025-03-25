"use client";
import React from "react";
import Popup from "reactjs-popup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEducationModal } from "@/redux/profileSlice";

const qualificationList = [
  { id: "below_10th", name: "Below 10th class" },
  { id: "10th_class", name: "10th class" },
  { id: "12th_class", name: "12th class" },
  { id: "diploma_certificate", name: "Diploma/Certificate" },
  { id: "iti", name: "ITI" },
  { id: "graduate", name: "Graduate" },
  { id: "post_graduate", name: "Post Graduate" },
];

const EducationModal = () => {
  const { educationModal } = useAppSelector((state) => state.profile);

  console.log(educationModal, "Verify Education Modal");
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setEducationModal(false));
  };

  return (
    <Popup
      open={educationModal}
      onClose={closeModal}
      modal
      className="onboarding relative"
      overlayStyle={{
        background: "#4D4D4DC2",
        padding: "20px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div>
        <div className="flex justify-end">
          <IoClose
            className="mr-4 mt-4 size-8 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <Formik
          initialValues={{ education_id: "" }}
          validationSchema={Yup.object().shape({
            education_id: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form className="pb-8 px-2 lg:px-8 xl:px-0">
              <h2 className="text-center !text-[#231F20] text-3xl font-semibold !mb-4">
                Edit your <span className="text-red">education</span>
              </h2>
              <div className="scroll-content">
                <div className="!mt-9">
                  <label
                    className="block font-semibold mb-1 !text-[#231F20] !text-xl"
                    htmlFor="fileInput"
                  >
                    What is your highest level of education?
                  </label>
                  <div className="relative flex flex-col gap-2 w-full py-2 bg-white rounded-lg">
                    {qualificationList.map((education) => (
                      <label
                        htmlFor={education.id}
                        key={education.id}
                        onClick={() =>
                          setFieldValue("education_id", education.id)
                        }
                        className={`form-group flex items-center gap-4 rounded-lg px-5 py-3 border shadow-sm cursor-pointer ${
                          education.id === values.education_id
                            ? "border-red bg-[#FDF1F3]"
                            : "border-[#C8C9CB1A]"
                        }`}
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
                          <span className="text-[#231F20]">
                            {education.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="h-1">
                    <ErrorMessage
                      name="education_id"
                      component="div"
                      className="text-red text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`max-w-[100px] no-margin sm:max-w-[250px] ${
                    !dirty || isSubmitting
                      ? "!opacity-50 !cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={!dirty || isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Popup>
  );
};

export default EducationModal;
