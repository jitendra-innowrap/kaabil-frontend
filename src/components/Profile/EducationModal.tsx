"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEducationModal, setResumeModal } from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const EducationModal = () => {
  const { educationModal } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const qualificationList = [
    { id: "below_10th", name: "Below 10th class" },
    { id: "10th_class", name: "10th class" },
    { id: "12th_class", name: "12th class" },
    { id: "diploma_certificate", name: "Diploma/Certificate" },
    { id: "iti", name: "ITI" },
    { id: "graduate", name: "Graduate" },
    { id: "post_graduate", name: "Post Graduate" },
  ];

  const validationSchema = Yup.object().shape({
    education_id: Yup.string().required("Required"),
  });

  const closeModal = () => {
    dispatch(setEducationModal(false));
  };

  return (
    <Dialog
      open={educationModal}
      handler={closeModal}
      size="md"
      className="fixed -top-20 -translate-x-1/2 custom-dialog"
    >
      <div>
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
          initialValues={{ education_id: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form>
              <DialogBody className="p-0 mt-8 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
                <div className="px-12">
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
                          <span className="text-[#231F20] text-xl">
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
                  <div className="mt-3">
                    <label
                      className="block font-semibold mb-1 !text-[#231F20] !text-xl"
                      htmlFor="fileInput"
                    >
                      Certification
                    </label>
                    <div className="flex gap-4 mt-2 pb-2">
                      <img src="/new-assets/icons/certificate.svg" />
                      <img src="/new-assets/icons/certificate.svg" />
                      <img src="/new-assets/icons/certificate.svg" />
                      <img src="/new-assets/icons/certificate.svg" />
                    </div>
                  </div>
                </div>
              </DialogBody>
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
