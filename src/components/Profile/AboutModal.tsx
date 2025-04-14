// import React from 'react'
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "@/Services/Apiservice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { fetchProfile, setAboutMeModal } from "@/redux/profileSlice";
import { useState } from "react";

export const AboutModal = ({ size }: any) => {
  const { token } = useAppSelector((state) => state.auth);
  const { aboutMeModal, profileData } = useAppSelector(
    (state) => state.profile
  );
  const [charCount, setCharCount] = useState(profileData?.bio_text?.length || 0);

  const dispatch = useAppDispatch();
  const initialValues = {
    bio_text: profileData?.bio_text || "",
  };
  const validationSchema = Yup.object().shape({
    bio_text: Yup.string().required("Required"),
  });
  const closePopup = () => {
    dispatch(setAboutMeModal(false));
  };
  return (
    // @ts-ignore
    <Dialog
      open={aboutMeModal}
      handler={closePopup}
      size={size}
      className={`${
        size === "md"
          ? "fixed -top-10 -translate-x-1/2 custom-dialog"
          : "top-14 mx-auto fixed bottom-0 rounded-2xl"
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
                Edit <span className="text-red">about me</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("bio_text", values.bio_text);
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
                : toast.error(response.data.msg || "Failed To Update Bio", {
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
          {({ isSubmitting, dirty,  values, handleChange  }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody
                className={`p-0  max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll ${
                  size === "xxl" ? "mt-4" : "mt-8"
                }`}
              >
                <div className={`${size === "xxl" ? "px-4" : "px-12"}`}>
                  <div className={`${size === "xxl" ? "mt-0" : "mt-4"}`}>
                    <label
                      className={`block font-semibold mb-1  ${
                        size === "xxl" ? "text-sm" : "text-xl"
                      }`}
                      htmlFor="bio_text"
                    >
                      About Me
                    </label>
                    <div className="relative">
                      <Field
                        as="textarea"
                        name="bio_text"
                        id="bio_text"
                        placeholder="Enter about me"
                        rows={8}
                        maxLength={1000}
                        className="w-full pl-6 pt-4 text-lg bg-[#F2F3F3] focus:outline-none rounded-lg"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          handleChange(e);
                          setCharCount(e.target.value.length);
                        }}
                      />
                      <div className="absolute -bottom-4 right-2 text-sm text-gray-500">
                        {1000 - charCount} character(s) left
                      </div>
                    </div>
                    <div className="h-3">
                      <ErrorMessage
                        name="bio_text"
                        component="div"
                        className="text-red text-md mt-1"
                      />
                    </div>
                  </div>
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter
                className={`flex justify-end p-0 pb-3  ${
                  size === "xxl" ? "px-5 mt-2" : "px-12 mt-4"
                }`}
              >
                <button
                  type="submit"
                  className={`px-20  bg-[#E31837] text-white rounded-xl ${
                    isSubmitting || !dirty
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } ${size === "xxl" ? "py-3" : "py-4"}`}
                  disabled={isSubmitting || !dirty}
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
