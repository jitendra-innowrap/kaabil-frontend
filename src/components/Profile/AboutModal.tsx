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

export const AboutModal = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { aboutMeModal, profileData } = useAppSelector(
    (state) => state.profile
  );
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
      size="md"
      className="fixed top-10 -translate-x-1/2 custom-dialog"
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
          {({ isSubmitting }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody className="p-0 mt-8">
                <div className="px-8">
                  <div className="mt-4">
                    <label
                      className="block font-semibold mb-1 !text-xl"
                      htmlFor="bio_text"
                    >
                      About Me
                    </label>
                    <Field
                      as="textarea"
                      name="bio_text"
                      id="bio_text"
                      placeholder="Enter about me"
                      rows={9}
                      className="w-full pl-6 pt-4 text-lg bg-[#F2F3F3] focus:outline-none rounded-lg "
                    />
                    <div className="h-1">
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
              <DialogFooter className="flex justify-end p-0 pb-3 px-8 mt-4">
                <button
                  type="submit"
                  className={`px-20 py-4 bg-[#E31837] text-white rounded-xl ${
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
