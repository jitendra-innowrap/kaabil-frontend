"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResumeModal } from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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
    // Suppressing Dialog type error
    // @ts-ignore
    <Dialog
      open={resumeModal}
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
                Attach your <span className="text-red">resume</span>
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
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0 mt-8 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
                <div className="px-12">
                  <div className="!mt-4">
                    <label
                      className="block font-semibold mb-1 text-[#231F20] text-xl"
                      htmlFor="fileInput"
                    >
                      Resume
                    </label>
                    <div className="relative flex items-center w-full py-2 border-resume bg-white rounded-lg">
                      <input
                        type="file"
                        id="fileInput"
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const file =
                            event.target.files && event.target.files[0];
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
                  <div className="mt-4">
                    <label
                      className="block font-semibold mb-1 text-xl"
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
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter className="flex justify-end p-0 pb-3 px-12">
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

export default ResumeModal;
