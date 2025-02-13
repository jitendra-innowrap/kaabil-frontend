import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import { updateName } from '@/redux/userSlice';
import React, { useState } from 'react'

export default function EnterName() {
  const progress = useAppSelector((state) => state.progress.value);
      const dispatch = useAppDispatch();
      const [name, setName] = useState("")

      const handleSubmit =()=>{
        dispatch(setProgress(5));
        dispatch(updateName(name));
      }
      const handleChange =(e:any)=>{
        setName(e.target.value)
      }
    return (
      <div>
          <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>Welcome to <span className='text-red font-kalam'>Kaabil</span></h2>
          <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
              <label htmlFor="name">Enter your full name</label>
              <input type="text" id="name" value={name} onChange={handleChange} name="name" placeholder="Enter your full name" />
              <button className={`${name?'':'disable'}`} disabled={!name} type="submit">
                  next
              </button>
          </form>
      </div>
    )
}
