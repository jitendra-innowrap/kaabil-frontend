import MultiSelect from '@/components/Inputs/MultiSelect';
import SelectedChips from '@/components/Inputs/SelectedChips';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import api from '@/Services/Apiservice';
import { getAuthUserDesiredRole, storeAuthUserUserSkills, storeProgress } from '@/components/utils/deviceId';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { setUserSkills } from '@/redux/userSlice';

interface Skill {
  value: string;
  label: string;
}

export default function AddSkills() {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const { role_id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchSkills();
  }, []);

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
          skill_level_type: "1",
        }))
      );
    }
  }, [user.skills]);

  const fetchSkills = async () => {
    const authUserRole = getAuthUserDesiredRole();
    const department_id = Array.isArray(authUserRole?.role_id) && authUserRole.role_id.length > 0
      ? authUserRole.role_id.map((id) => ({ department_id: 0, profession_id: id }))
      : [
          role_id?.[0] && { department_id: 0, profession_id: role_id[0] },
          role_id?.[1] && { department_id: 0, profession_id: role_id[1] }
        ].filter(Boolean);

    try {
      const payload = new FormData();
      payload.append("field_study_id", "");
      payload.append("department_id", JSON.stringify(department_id));
      payload.append("page", "1");
      payload.append("search", "");

      const response = await api.post('/MasterData/getUserSkill', payload, {
        headers: { "Content-Type": "multipart/json" },
      });

      const fetchedSkills = response?.data?.result?.map((skill: any) => ({
        value: skill.id,
        label: skill.name,
      })) || [];

      setSkillsList(fetchedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    user_skill: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          name: Yup.string().required(),
          skill_level_type: Yup.string().required(),
        })
      )
      .min(1, "Select at least one skill")
      .required("Skills are required"),
  });

  const formik = useFormik({
    initialValues: {
      user_skill: [] as { id: string; name: string; skill_level_type: string }[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values?.user_skill.length < 1) {
        formik.errors.user_skill = "Select at least one skill";
      }
      try {
        const response = await api.post("/Auth/addJobseekerProfile", values);
        if (response?.data?.code === 1) {
          dispatch(setProgress(7));
          dispatch(setUserSkills(values.user_skill));
          toast.success("Skills submitted successfully!", { position: "bottom-right" });
        } else {
          toast.error(response?.data?.message || "Submission failed!", { position: "bottom-right" });
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
    <div>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[36px]'>
        <span className='text-red'>Skills</span>
      </h2>

      <h3 className='md:text-lg font-semibold text-center'>Add skills to find the right job for you.</h3>
      <form onSubmit={formik.handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>Add Skills</h4>
        <p className='text-sm text-[#249D64]'>(You can search and add all your relevant skills)</p>
        <div className="my-4">
          <MultiSelect
            options={skillsList}
            placeholder='Select Skills'
            isMulti
            onChange={(selectedOptions) => {
              setSelectedSkills(selectedOptions);
              formik.setFieldValue(
                "user_skill",
                selectedOptions.map((skill) => ({
                  id: skill.value,
                  name: skill.label,
                  skill_level_type: "1",
                }))
              );
            }}
            selectedValues={selectedSkills}
          />
        </div>
        <SelectedChips
          selectedValues={selectedSkills}
          onRemove={(value) => {
            const updatedSkills = selectedSkills.filter((skill) => skill.value !== value);
            setSelectedSkills(updatedSkills);
            formik.setFieldValue(
              "user_skill",
              updatedSkills.map((skill) => ({
                id: skill.value,
                name: skill.label,
                skill_level_type: "1",
              }))
            );
          }}
        />
        {formik.errors.user_skill && formik.touched.user_skill && (
          <div className="text-red text-sm mt-1">{formik.errors.user_skill as string}</div>
        )}

        <h4 className='text-lg font-medium my-4'>Suggested skills</h4>
        <div className="flex flex-wrap gap-4">
          {skillsList.slice(0, 6).map((skill) => (
            <React.Fragment key={skill.value}>
              {selectedSkills.some((s) => s.value === skill.value) ? (
                <div className="label-option selected flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
                  {skill.label}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const updatedSkills = selectedSkills.filter((s) => s.value !== skill.value);
                      setSelectedSkills(updatedSkills);
                      formik.setFieldValue(
                        "user_skill",
                        updatedSkills.map((skill) => ({
                          id: skill.value,
                          name: skill.label,
                          skill_level_type: "1",
                        }))
                      );
                    }}
                  >
                    <RxCross2 />
                  </span>
                </div>
              ) : (
                <div className="label-option add flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
                  {skill.label}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const updatedSkills = [...selectedSkills, skill];
                      setSelectedSkills(updatedSkills);
                      formik.setFieldValue(
                        "user_skill",
                        updatedSkills.map((skill) => ({
                          id: skill.value,
                          name: skill.label,
                          skill_level_type: "1",
                        }))
                      );
                    }}
                  >
                    <IoIosAdd />
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className='flex w-full justify-between items-end'>
          <div className='whitespace-nowrap'>
            <span className='text-red'>{progress - 4}</span> - 6
          </div>
          <button
            type="submit"
            className={`max-w-[100px] sm:max-w-[250px] ${
              formik.isValid ? "bg-red text-white" : "!opacity-50 !cursor-default"
            }`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}