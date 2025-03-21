"use client"; // Mark this as a Client Component

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import MobileInputForm from "./MobileInputForm";
import OTPInputForm from "./OTPInputForm";
import NumberVerified from "./NumberVerified";
import EnterName from "../OnBoarding/EnterName";
import AddJobRole from "../OnBoarding/AddJobRole";
import AddSkills from "../OnBoarding/AddSkills";
import AddLocation from "../OnBoarding/AddLocation";
import AddExperience from "../OnBoarding/AddExperience";
import AddMoreExperience from "../OnBoarding/AddMoreExperience";
import OnBoardingComplete from "../OnBoarding/OnBoardingComplete";
import { FaArrowLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import AddEducation from "../OnBoarding/AddEducation";

interface prop {
  onClose: () => void;
}
export default function SignIn({ onClose }: prop) {
  const progress = useAppSelector((state) => state.progress.value); // Access progress state
  const { is_fresher } = useAppSelector((state) => state.user); // Access progress state
  const dispatch = useAppDispatch();
  const handleBack = () => {
    if (progress == 11 && is_fresher == 2) {
      dispatch(setProgress(progress - 2));
    } else {
      dispatch(setProgress(progress - 1));
    }
  };
  return (
    <div className="relative sign-up-modal mx-auto py-5 md:py-8 xl:py-10 w-[90%] rounded-2xl">
      {(progress >= 5 || progress === 2) && progress !== 11 && (
        <div onClick={handleBack}>
          <FaArrowLeft className="absolute cursor-pointer top-4 z-30 -left-2 size-6 stroke-[1.4]" />
        </div>
      )}
      <div onClick={onClose}>
        <IoClose className="absolute z-30 cursor-pointer top-4 -right-4 size-8 font-bold stroke-[1.9]" />
      </div>
      {progress === 1 && <MobileInputForm />}
      {progress === 2 && <OTPInputForm onClose={onClose} />}
      {progress === 3 && <NumberVerified />}
      {progress === 4 && <EnterName />}
      {progress === 5 && <AddJobRole />}
      {progress === 6 && <AddSkills />}
      {progress === 7 && <AddLocation />}
      {progress === 8 && <AddEducation />}
      {progress === 9 && <AddExperience />}
      {progress === 10 && <AddMoreExperience />}
      {progress === 11 && <OnBoardingComplete onClose={onClose} />}
    </div>
  );
}
