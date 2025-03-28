"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResumeModal, fetchProfile } from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import api from "@/Services/Apiservice";

const ResumeModal = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { resumeModal } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const initialValues = {
    user_portfolio_attachment_type: "4", // Default to image type
    user_portfolio_name: "",
    user_portfolio: null,
  };

  const validationSchema = Yup.object().shape({
    user_portfolio: Yup.mixed().required("Required"),
  });

  const closePopup = () => {
    dispatch(setResumeModal(false));
  };

  return (
    // @ts-ignore
    <Dialog
      open={resumeModal}
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
                Attach your <span className="text-red">resume</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: any) => {
            const formData = new FormData();
            formData.append(
              "user_portfolio_attachment_type",
              JSON.stringify([values.user_portfolio_attachment_type])
            );
            formData.append(
              "user_portfolio_name",
              JSON.stringify([values.user_portfolio.name])
            );
            formData.append("user_portfolio[]", values.user_portfolio);

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
          {({ setFieldValue, isSubmitting, values }) => (
            <Form>
              {/* @ts-ignore */}

              <DialogBody className="p-0 mt-8 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
                <div className="px-12">
                  <div>
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
                        accept=".pdf,.doc,.docx,image/*,video/*"
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            const fileType = file.type;

                            // Determine the attachment type based on the file type
                            let attachmentType = "";
                            if (fileType.startsWith("image/")) {
                              attachmentType = "4"; // Image
                            } else if (fileType === "application/pdf") {
                              attachmentType = "1"; // PDF
                            } else if (fileType.startsWith("video/")) {
                              attachmentType = "5"; // Video
                            }
                            setFieldValue("user_portfolio_name", file.name);
                            setFieldValue("user_portfolio", file);
                            setFieldValue(
                              "user_portfolio_attachment_type",
                              attachmentType
                            ); // Set the attachment type
                          }
                        }}
                      />
                      <div className="flex-grow text-md text-[#4D4D4F] px-3">
                        {values?.user_portfolio_name
                          ? `Selected File: ${values.user_portfolio_name}`
                          : "Upload Portfolio File"}
                      </div>
                      <img
                        src="/new-assets/icons/attach_file.svg"
                        alt="Attach File"
                        className="w-9 h-9 pr-3"
                      />
                    </div>
                    <div className="h-1">
                      <ErrorMessage
                        name="user_portfolio"
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter className="flex justify-end p-0 pb-3 px-12 mt-4">
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

export default ResumeModal;
