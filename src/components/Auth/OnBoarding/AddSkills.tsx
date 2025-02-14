import MultiSelect from '@/components/Inputs/MultiSelect';
import SelectedChips from '@/components/Inputs/SelectedChips';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

export default function AddSkills() {
  const progress = useAppSelector((state) => state.progress.value);
  const dispatch = useAppDispatch();
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProgress(7));
  };

  const handleJobRoleChange = (selectedRoles: { value: string; label: string }[]) => {
    setSkills(selectedRoles);
  };

  const handleRemoveJobRole = (value: string) => {
    setSkills(prev => prev.filter(role => role.value !== value));
  };

  const handleAddJobRole = (role: { value: string; label: string }) => {
    setSkills(prev => [...prev, role]);
  };

  const skillsList = [
    { value: '1', label: 'Adobe Creative Cloud' },
    { value: '2', label: 'Git' },
    { value: '3', label: 'Docker' },
    { value: '4', label: 'JavaScript' },
    { value: '5', label: 'React' },
    { value: '6', label: 'Node.js' },
    { value: '7', label: 'Python' },
    { value: '8', label: 'SQL' },
    { value: '9', label: 'AWS' },
    { value: '10', label: 'Azure' },
    { value: '11', label: 'UI/UX Design' },
    { value: '12', label: 'Agile Methodology' },
    { value: '13', label: 'Machine Learning' },
    { value: '14', label: 'Data Analysis' },
    { value: '15', label: 'Project Management' },
  ];


  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[36px]'>
        <span className='text-red'>Skills</span>
      </h2>
      <h3 className='md:text-lg font-semibold text-center'>Add skills to find the right job for you.</h3>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>Add Skills</h4>
        <p className='text-sm text-[#249D64]'>(You can search and add all your relevant skills )</p>
        <div className="my-4">
        <MultiSelect
          options={skillsList}
          placeholder="Select Role"
          isMulti
          
          onChange={handleJobRoleChange}
          selectedValues={skills}
        />
        </div>
        <SelectedChips selectedValues={skills} onRemove={handleRemoveJobRole} />

        <h4 className='text-lg font-medium my-4'>Suggested skills</h4>
        <div className="flex flex-wrap gap-4">
        {skillsList.slice(1,7).map(role => (
            <React.Fragment key={role.value} >
              {
                skills.some(skill => skill.value === role.value) ? (
                  <div key={role.value} className="label-option selected flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
                    {role.label}
                    <span className="cursor-pointer" onClick={() => handleRemoveJobRole(role.value)}>
                      <RxCross2 />
                    </span>
                  </div>
                ) : (
                  <div key={role.value} className="label-option add flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
                    {role.label}
                    <span className="cursor-pointer" onClick={() => handleAddJobRole(role)}>
                      <IoIosAdd />
                    </span>
                  </div>
                )
              }
            </React.Fragment>
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
