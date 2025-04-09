import MultiSelect from "@/components/Inputs/MultiSelect";
import SelectedChips from "@/components/Inputs/SelectedChips";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import api from "@/Services/Apiservice";
import {
  getAuthUserDesiredRole,
  storeAuthUserUserSkills,
  storeProgress,
} from "@/components/utils/deviceId";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { setUserSkills } from "@/redux/userSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "../SignIn/signIn.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Skill {
  value: string;
  label: string;
}

export default function AddSkills({ size, closePopup, handleBack }: any) {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const { role_id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchSkills("");
  }, [progress]);

  // Initialize selectedSkills with user's existing skills
  useEffect(() => {
    if (user.skills) {
      const initialSkills = user.skills.map((skill) => ({
        value: skill.id,
        label: skill.name,
      }));
      setSelectedSkills(initialSkills);
      formik.setFieldValue(
        "user_skill",
        initialSkills.map((skill) => ({
          id: skill.value,
          name: skill.label,
          skill_level_type_id: "1",
        }))
      );
    }
  }, [user.skills, progress]);

  const fetchSkills = async (search: any) => {
    const authUserRole = getAuthUserDesiredRole();
    const department_id =
      Array.isArray(authUserRole?.role_id) && authUserRole.role_id.length > 0
        ? authUserRole.role_id.map((id) => ({
            department_id: 0,
            profession_id: id,
          }))
        : [
            role_id?.[0] && { department_id: 0, profession_id: role_id[0] },
            role_id?.[1] && { department_id: 0, profession_id: role_id[1] },
          ].filter(Boolean);

    try {
      const payload = new FormData();
      payload.append("field_study_id", "");
      payload.append("department_id", JSON.stringify(department_id));
      payload.append("page", "1");
      payload.append("search", search);

      const response = await api.post("/MasterData/getUserSkill", payload, {
        headers: { "Content-Type": "multipart/json" },
      });

      const fetchedSkills =
        response?.data?.result?.map((skill: any) => ({
          value: skill.id,
          label: skill.name,
        })) || [];

      setSkillsList(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    user_skill: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          name: Yup.string().required(),
          skill_level_type_id: Yup.string().required(),
        })
      )
      .min(1, "Select at least one skill")
      .required("Skills are required"),
  });

  const formik = useFormik({
    initialValues: {
      user_skill: [] as {
        id: string;
        name: string;
        skill_level_type_id: string;
      }[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values?.user_skill.length < 1) {
        formik.errors.user_skill = "Select at least one skill";
      }
      try {
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value !== "string") {
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString); // Convert all values to strings
          }
        });
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response?.data?.code === 1) {
          dispatch(setProgress(7));
          dispatch(setUserSkills(values.user_skill));
          toast.success("Skills submitted successfully!", {
            position: "bottom-right",
          });
        } else {
          toast.error(response?.data?.message || "Submission failed!", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("Error submitting skills:", error);
        toast.error("Something went wrong!", { position: "bottom-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={`pb-6 sm:p-6 ${styles.formscrollitem}`}>
      <div className="relative w-full">
        <div onClick={handleBack}>
          <FaArrowLeft className="absolute cursor-pointer top-2 z-30 left-2 size-6" />
        </div>
        <IoClose
          className="absolute top-2 right-2 cursor-pointer"
          size={size === "md" ? 32 : 28}
          onClick={closePopup}
        />
        <div
          className={`flex sm:justify-center items-center pt-[74px] sm:pt-[30px]`}
        >
          <h2
            className={`text-[#231F20] font-semibold  ${
              size === "md"
                ? "!text-[28px] text-center"
                : "!text-[20px] text-start"
            }`}
          >
            <span className="text-red">Skills</span>
            <br />
            <span
              className={`text-[#231F20] ${
                size === "xxl" ? "text-sm" : "text-[20px]"
              }`}
            >
              Add skills to find the right job for you.
            </span>
          </h2>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={`${size === "md" ? "block mt-6" : `mt-2`}`}
      >
        {/* @ts-ignore */}
        <div className={`${styles.formscrollitemlg}`}>
          <div
            className={`pb-2 cursor-pointer ${
              size === "md" ? "px-12" : "px-0"
            }`}
          >
            <h4 className="text-[14px] sm:text-lg font-medium text-[#231F20]">
              Add Skills
            </h4>
            <p
              className={`${
                size === "xxl" ? "text-[11px] sm:text-xs" : "text-sm"
              } text-[#249D64]`}
            >
              (You can search and add all your relevant skills)
            </p>
            <div className={`my-4 multi-select ${styles.multi_select}`}>
              <MultiSelect
                options={skillsList}
                placeholder="Select Skills"
                isMulti
                onInputChange={(value: any) => fetchSkills(value)}
                onChange={(selectedOptions) => {
                  setSelectedSkills(selectedOptions);
                  formik.setFieldValue(
                    "user_skill",
                    selectedOptions.map((skill) => ({
                      id: skill.value,
                      name: skill.label,
                      skill_level_type_id: "1",
                    }))
                  );
                }}
                selectedValues={selectedSkills}
                icon={
                  <FaMagnifyingGlass className="absolute left-[15px] top-[14px] sm:top-[20px] size-4 text-[#808080]" />
                }
              />
            </div>
            <div className={""}>
              <SelectedChips
                selectedValues={selectedSkills}
                size={size}
                onRemove={(value) => {
                  const updatedSkills = selectedSkills.filter(
                    (skill) => skill.value !== value
                  );
                  setSelectedSkills(updatedSkills);
                  formik.setFieldValue(
                    "user_skill",
                    updatedSkills.map((skill) => ({
                      id: skill.value,
                      name: skill.label,
                      skill_level_type_id: "1",
                    }))
                  );
                }}
              />
              {formik.errors.user_skill && formik.touched.user_skill && (
                <div className="text-red text-sm mt-1">
                  {formik.errors.user_skill as string}
                </div>
              )}

              <h4 className="text-[14px] sm:text-lg font-medium my-4 text-[#231F20]">
                Suggested skills
              </h4>
              <div className="flex flex-wrap gap-4 pb-10 sm:pb-0">
                {skillsList.slice(0, 6).map((skill) => (
                  <React.Fragment key={skill.value}>
                    {selectedSkills.some((s) => s.value === skill.value) ? (
                      <div
                        className={`label-option selected flex items-center gap-2 bg-gray-200 px-3 py-1 rounded ${
                          size === "xxl" ? "text-xs" : "text-md"
                        }`}
                        onClick={() => {
                          const updatedSkills = selectedSkills.filter(
                            (s) => s.value !== skill.value
                          );
                          setSelectedSkills(updatedSkills);
                          formik.setFieldValue(
                            "user_skill",
                            updatedSkills.map((skill) => ({
                              id: skill.value,
                              name: skill.label,
                              skill_level_type_id: "1",
                            }))
                          );
                        }}
                      >
                        {skill.label}
                        <span className="cursor-pointer">
                          <RxCross2 />
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`label-option add flex items-center gap-2 bg-gray-200 px-3 py-1 rounded ${
                          size === "xxl" ? "text-xs" : "text-md"
                        }`}
                        onClick={() => {
                          const updatedSkills = [...selectedSkills, skill];
                          setSelectedSkills(updatedSkills);
                          formik.setFieldValue(
                            "user_skill",
                            updatedSkills.map((skill) => ({
                              id: skill.value,
                              name: skill.label,
                              skill_level_type_id: "1",
                            }))
                          );
                        }}
                      >
                        {skill.label}
                        <span className="cursor-pointer">
                          <IoIosAdd />
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* @ts-ignore */}
        <div
          className={`py-2 sm:py-0 sm:pb-6 sm:!px-12 mt-5 flex justify-center fixed sm:relative w-full bottom-2 bg-white ${styles.formactionbtn}`}
        >
          <div className="flex w-full justify-between items-end">
            <div className="whitespace-nowrap">
              <span className="text-red">{progress - 4}</span> - 6
            </div>
            <button
              type="submit"
              className={`dialog-action-btn font-semibold max-w-[200px] w-[160px] sm:w-[250px] ${
                formik.isValid
                  ? "bg-red text-white"
                  : "!opacity-50 !cursor-default"
              }`}
              disabled={formik.isSubmitting}
            >
              {/* {formik.isSubmitting ? "Submitting..." : "Next"} */}
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
