import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import { updateName } from '@/redux/userSlice';
import MultiSelect from '@/components/Inputs/MultiSelect';
import SelectedChips from '@/components/Inputs/SelectedChips';
import { RxCross2 } from 'react-icons/rx';
import { FaArrowLeft, FaMagnifyingGlass } from 'react-icons/fa6';


export default function AddJobRole() {
  const progress = useAppSelector((state) => state.progress.value);
  const name = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  const [jobRoles, setJobRoles] = useState<{ value: string; label: string }[]>([]);
  const [jobType, setJobType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProgress(6));
  };

  const handleJobRoleChange = (selectedRoles: { value: string; label: string }[]) => {
    setJobRoles(selectedRoles);
  };

  const handleRemoveJobRole = (value: string) => {
    setJobRoles(prev => prev.filter(role => role.value !== value));
  };

  const rolesList = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Editor' },
    { value: '3', label: 'Viewer' },
  ];

  const jobTypes = ["Full Time", "Part Time", "Internship"];

  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] xl:leading-[36px]'>
        <span className='text-red'>Hi {name}!</span> <br />Take the first step to find a job
      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>What job role are you looking for?</h4>
        <p className='text-sm text-[#249D64]'>(You can select up to 2 job roles)</p>
        <div className="my-4">
        <MultiSelect
          options={rolesList}
          placeholder="Select Role"
          isMulti
          
          onChange={handleJobRoleChange}
          selectedValues={jobRoles}
          icon={<FaMagnifyingGlass className='absolute left-[15px] top-[20px] size-4 text-[#808080]' />}
        />
        </div>
        <SelectedChips selectedValues={jobRoles} onRemove={handleRemoveJobRole} />

        <h4 className='text-lg font-medium my-4'>What type of job required?</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {jobTypes.map(type => (
            <div
              key={type}
              className={`col-span-1 label-option cursor-pointer px-4 py-2 rounded ${jobType === type ? 'bg-red text-white' : ''}`}
              onClick={() => setJobType(type)}
            >
              {type}
            </div>
          ))}
        </div>
        
        <div className="flex w-full justify-between items-end">
          <div className="whitespace-nowrap"><span className='text-red'>{progress-4}</span> - 6</div>
          <button className={`max-w-[100px] sm:max-w-[250px]`} disabled={false} type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}