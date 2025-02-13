import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image';
import React from 'react'

export default function NumberVerified() {
    const mobile = useAppSelector((state) => state.user.number);
    const dispatch = useAppDispatch();
    const handleSubmit =()=>{
        dispatch(setProgress(4));
    }
    
    return (
        <div>
            <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>Number Verified</h2>
            <Image
                src={'/new-assets/icons/number-verified.png'}
                width={100}
                height={100}
                className='w-16 h-16 lg:w-20 lg:h-20 mx-auto'
                alt='number-verified'
                />
            <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="form-group relative">
                    <Image
                    src={'/new-assets/icons/number-verified.png'}
                    width={100}
                    height={100}
                    className='w-8 h-8 absolute right-3 top-3'
                    alt='number-verified'
                    />
                    <input type="tel" id="mobile" value={mobile} disabled name="mobile" placeholder="Enter your mobile number to receive OTP" />
                </div>
                <button className={`${mobile?'':'disable'}`} disabled={!mobile} type="submit">
                    next
                </button>
            </form>
        </div>
      )
}
