import MultiSelect from '@/components/Inputs/MultiSelect';
import SelectedChips from '@/components/Inputs/SelectedChips';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'
import { RiMapPin2Line } from 'react-icons/ri';

export default function AddLocation() {
  const progress = useAppSelector((state) => state.progress.value);
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<{ value: string; label: string }[]>([]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProgress(8));
  };

  const handleJobRoleChange = (selectedRoles: { value: string; label: string }[]) => {
    setLocation(selectedRoles);
  };

  const handleRemoveJobRole = (value: string) => {
    setLocation(prev => prev.filter(role => role.value !== value));
  };


  const locationList = [
    { value: '1', label: 'Mumbai, Maharashtra' },
    { value: '2', label: 'Delhi, Delhi' },
    { value: '3', label: 'Bangalore, Karnataka' },
    { value: '4', label: 'Hyderabad, Telangana' },
    { value: '5', label: 'Chennai, Tamil Nadu' },
    { value: '6', label: 'Kolkata, West Bengal' },
    { value: '7', label: 'Pune, Maharashtra' },
    { value: '8', label: 'Ahmedabad, Gujarat' },
    { value: '9', label: 'Jaipur, Rajasthan' },
    { value: '10', label: 'Lucknow, Uttar Pradesh' },
    { value: '11', label: 'Surat, Gujarat' },
    { value: '12', label: 'Kanpur, Uttar Pradesh' },
    { value: '13', label: 'Nagpur, Maharashtra' },
    { value: '14', label: 'Indore, Madhya Pradesh' },
    { value: '15', label: 'Thane, Maharashtra' },
  ];

  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[36px]'>
        <span className='text-red'>Where</span> do you want
        to work?
      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>Select job location</h4>
        <div className="my-4">
        <MultiSelect
          options={locationList}
          placeholder="Job location"
          isMulti
          
          onChange={handleJobRoleChange}
          selectedValues={location}
          icon={<RiMapPin2Line className='absolute left-[15px] top-[20px] size-4 text-[#808080]' />}
        />
        </div>
        <SelectedChips selectedValues={location} onRemove={handleRemoveJobRole} />

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
