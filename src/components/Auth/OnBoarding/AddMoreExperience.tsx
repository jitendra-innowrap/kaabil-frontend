import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useRef, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import AddExperienceForm from './AddExperienceForm';
import Image from 'next/image';
import { formatJobDuration, formatMonthYear } from '@/components/utils';
import { Experience } from '@/Types/common';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { setUserExperience } from '@/redux/userSlice';
import api from '@/Services/Apiservice';

export default function AddMoreExperience() {
  const progress = useAppSelector((state) => state.progress.value);
  const { experience, is_fresher } = useAppSelector((state) => state.user);
  const [experiences, setExperiences] = useState<Experience[]>(experience);
  const formikFormRef = useRef<any>(null); // Ref to access child formik methods
  const dispatch = useAppDispatch();
  const [newExperience, setNewExperience] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which experience is being edited
  const [isSubmitting, setIsSubmitting] = useState(false); // Disable buttons during submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if(newExperience){
      formikForm.handleSubmit();
    }
    try {
      if (is_fresher === 1) {
        const payload = {
          is_fresher: is_fresher,
          total_experiences: experiences.length,
          user_experiences: experiences,
        }
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          if(typeof value !== 'string'){
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString ); // Convert all values to strings
          }
        });
        // If Experienced, submit with experiences
        const response = await api.post('/Auth/addJobseekerProfile', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.code === 1) {
          dispatch(setProgress(11)); // Move to the next step
          toast.success('Experience submitted successfully!', { position: 'bottom-right' });
        } else {
          toast.error(response?.data?.message || 'Submission failed!', { position: 'bottom-right' });
        }
      }
    } catch (error: any) {
      console.error('Error submitting experience:', error);
      toast.error(error?.message || 'Something went wrong!', { position: 'bottom-right' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddExperience = (experience: Experience) => {
    if (isEditing !== null) {
      // Update existing experience
      const updatedExperiences = [...experiences];
      updatedExperiences[isEditing] = experience;
      setExperiences(updatedExperiences);
      dispatch(setUserExperience(updatedExperiences));
      setIsEditing(null); // Exit edit mode
    } else {
      // Add new experience
      setExperiences([...experiences, experience]);
      dispatch(setUserExperience([...experiences, experience]));
    }
    setNewExperience(false); // Hide the form
    toast.success('Experience saved successfully!', { position: 'bottom-right' });
    formikForm.resetForm();
  };

  const handleEditExperience = (index: number) => {
    const experienceToEdit = experiences[index];
    formikForm.setValues({
      designation: experienceToEdit.designation_name,
      designation_master_id: experienceToEdit.designation_master_id,
      companyName: experienceToEdit.company_name,
      company_master_id: experienceToEdit.company_master_id,
      salary: experienceToEdit.in_hand_salary,
      type: experienceToEdit.job_type_id,
      type_name: experienceToEdit.job_type_name,
      jobStartDate: experienceToEdit.job_start_date,
      jobEndDate: experienceToEdit.job_end_date,
      isCurrentCompany: experienceToEdit.is_current_company == '1',
    });
    setIsEditing(index); // Set the index of the experience being edited
    setNewExperience(false); // Show the form
  };

  const validationSchemaForm = Yup.object().shape({
    designation: Yup.string().required('Designation is required'),
    companyName: Yup.string().required('Company name is required'),
    salary: Yup.number().required('Salary is required'),
    type: Yup.number().required('Job type is required'),
    isCurrentCompany: Yup.boolean(),
    jobStartDate: Yup.string().required('Start date is required'),
    jobEndDate: Yup.string().test(
      'job-end-date',
      'End date is required',
      function (value) {
        const { isCurrentCompany } = this.parent;
        return isCurrentCompany === false ? !!value : true; // Only check when current company is false
      }
    ),
  });

  // ✅ Formik Hook for the form
  const formikForm = useFormik({
    initialValues: {
      designation: '',
      designation_master_id: '',
      companyName: '',
      company_master_id: '',
      salary: '',
      type: '',
      type_name: '',
      jobStartDate: '',
      jobEndDate: '',
      isCurrentCompany: false,
    },
    validationSchema: validationSchemaForm,
    onSubmit: (values) => {
      const experience = {
        company_master_id: '1578', // Replace with actual company ID from API
        company_name: values.companyName,
        designation_master_id: '2698', // Replace with actual designation ID from API
        designation_name: values.designation,
        job_type_id: values.type,
        job_type_name: values.type_name,
        job_start_date: values.jobStartDate,
        job_end_date: values.isCurrentCompany ? '' : values.jobEndDate,
        in_hand_salary: values.salary,
        is_current_company: values.isCurrentCompany ? '1' : '0',
        additional_info: '',
      };
      handleAddExperience(experience);
    },
  });

  const setFormikFormRef = (instance: any) => {
    if (instance) {
      formikFormRef.current = instance;
    }
  };

  return (
    <div className="">
      <h2 className="text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[38px]">
        Your <span className="text-red">experience</span>
      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className="text-lg font-medium">Please add all your experience</h4>
        {/* Dynamic list of all experience added by the user */}
        {experiences.map((exp, i) => (
          <>{
            isEditing===i?
            <div className='mt-3'>
              <AddExperienceForm ref={setFormikFormRef} formik={formikForm} />
              {isEditing===i && (
                <div className="flex justify-end -translate-y-4">
                  <button type='button'
                  className=""
                  onClick={() => {
                    formikForm.handleSubmit();
                  }}
                >
                 Save
                </button>
                </div>
              )}
            </div>
            :
          <div key={i} className="my-4 p-4 rounded-lg shadow-default justify-between flex gap-4">
            <div className="">
              <h5 className="font-medium text-black mb-2">{exp?.designation_name}</h5>
              <h6 className="text-sm mb-2">
                {exp?.company_name} <GoDotFill className="inline-block size-2" /> {exp?.job_type_name}
              </h6>
              <h6 className="text-sm mb-2">
                {formatMonthYear(exp?.job_start_date)} -{' '}
                {exp?.is_current_company=='1' ? 'Present' : formatMonthYear(exp?.job_end_date)} <GoDotFill className="inline-block size-2" />{' '}
                {formatJobDuration(exp?.job_start_date, exp?.job_end_date)}
              </h6>
            </div>
            <div
              className="flex items-center h-fit cursor-pointer"
              onClick={() => handleEditExperience(i)}
            >
              <Image
                src={'/new-assets/icons/pencil.png'}
                alt="edit-pencil"
                aria-label="edit icon"
                className="w-3 h-3 mr-1"
                width={90}
                height={90}
              />
              <span className="text-red text-sm font-semibold">Edit</span>
            </div>
          </div>}
          </>
        ))}

        {newExperience && <AddExperienceForm ref={setFormikFormRef} formik={formikForm} />}

        {(
          <div
            className="flex text-red font-semibold mt-7 cursor-pointer"
            onClick={() => {
              if(!newExperience){
                formikForm.resetForm();
                setNewExperience(true);
                setIsEditing(null); // Reset edit mode
              }else{
                formikForm.handleSubmit();
              }
            }}
          >
            + add more experience
          </div>
        )}

        <div className="flex w-full items-end">
          <div className="whitespace-nowrap">
            <span className="text-red">{progress - 4}</span> - 6
          </div>
          <div className="flex gap-4 items-end w-full justify-end">
            <span
              onClick={() => dispatch(setProgress(11))}
              className={`max-w-[130px] text-[#231F20] cursor-pointer border-[#9C9C9C] flex items-center btn-border !py-3.5 !px-9 !rounded-xl`}
            >
              Skip
            </span>
            <button
              className="max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}