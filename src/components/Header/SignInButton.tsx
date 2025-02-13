'use client'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import SignIn from '@/components/Auth/SignIn';

export default function SignInButton() {
  return (
    <Popup 
    trigger={<button className='bg-red text-white text-sm w-[120px] h-[38px] grid place-items-center rounded-[9px]'>
        Sign In
    </button>} 
    modal
    overlayStyle={{
        background: '#4D4D4DC2',
        padding: '20px',
        borderRadius: '10px',
        overflow: 'hidden',
    }}
    >
        <SignIn/>
    </Popup>
  )
}
