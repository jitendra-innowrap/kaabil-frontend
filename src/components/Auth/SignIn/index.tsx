'use client'; // Mark this as a Client Component

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import MobileInputForm from './MobileInputForm';
import OTPInputForm from './OTPInputForm';

export default function SignIn() {
  const progress = useAppSelector((state) => state.progress.value); // Access progress state
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto py-5 md:py-8 xl:py-10 2xl:py-12 rounded-2xl">
      {progress === 1 && <MobileInputForm />}
      {progress === 2 && <OTPInputForm />}
    </div>
  );
}