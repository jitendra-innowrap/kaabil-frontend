'use client'
import React, { useRef, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import SignIn from '@/components/Auth/SignIn';
interface prop{
  closeSideMenu?: () => void;  
}
export default function SignInButton({closeSideMenu}: prop) {
  const popupRef = useRef<any>(null);
  const [open, setOpen] = useState(false)
  const closePopup = () => {
    setOpen(false);
    console.log('closePopup')
    if (popupRef.current) {
      popupRef.current.close(); // Manually close the popup
    }
  };
  const openPopup = () => {
    setOpen(true)
    if(closeSideMenu){
      closeSideMenu();
    }
  };
  return (
    <Popup 
    ref={popupRef}
    onOpen={openPopup}
    trigger={<button onClick={openPopup} className='bg-red text-white text-sm w-[120px] h-[38px] grid place-items-center rounded-[9px]'>
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
        {false && <SignIn onClose={closePopup} />}
    </Popup>
  )
}
