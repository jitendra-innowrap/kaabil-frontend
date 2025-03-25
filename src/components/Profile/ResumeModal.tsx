"use client";
import React from "react";
import Popup from "reactjs-popup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResumeModal } from "@/redux/profileSlice";

const ResumeModal = () => {
  const { resumeModal } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const initialValues = {
    aboutMe: "",
    resume: null,
    fileName: "",
  };

  const validationSchema = Yup.object().shape({
    aboutMe: Yup.string().required("Required"),
    resume: Yup.mixed().required("Required"),
  });

  const closePopup = () => {
    dispatch(setResumeModal(false));
  };

  return (
    <Popup
      open={resumeModal}
      onClose={closePopup}
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
            onClick={closePopup}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form className="pb-8 px-2 lg:px-8 xl:px-0">
              <h2 className="text-center !text-[#231F20] text-3xl font-semibold !mb-4">
                Attach your <span className="text-red">resume</span>
              </h2>
              <div className="!mt-9">
                <label
                  className="block font-semibold mb-1 !text-[#231F20] !text-xl"
                  htmlFor="fileInput"
                >
                  Resume
                </label>
                <div className="relative flex items-center w-full py-2 border-resume  bg-white rounded-lg">
                  <input
                    type="file"
                    id="fileInput"
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files && event.target.files[0];
                      if (file) {
                        setFieldValue("fileName", file.name);
                        setFieldValue("resume", file);
                      }
                    }}
                  />
                  <div className="flex-grow text-md text-[#4D4D4F] px-3">
                    {values?.fileName || "Upload Resume"}
                  </div>
                  <img
                    src="/new-assets/icons/attach_file.svg"
                    alt="Attach File"
                    className="w-9 h-9 pr-3"
                  />
                </div>
                <div className="h-1">
                  <ErrorMessage
                    name="resume"
                    component="div"
                    className="text-red text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="block font-semibold mb-1 !text-xl"
                  htmlFor="aboutMe"
                >
                  About Me
                </label>
                <Field
                  as="textarea"
                  name="aboutMe"
                  id="aboutMe"
                  placeholder="Enter about me"
                  rows={9}
                  className="w-full pl-6 pt-4 bg-[#F2F3F3] focus:outline-none rounded-lg"
                />
                <div className="h-1">
                  <ErrorMessage
                    name="aboutMe"
                    component="div"
                    className="text-red text-sm mt-1"
                  />
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

export default ResumeModal;
