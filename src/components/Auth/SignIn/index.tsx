import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import MobileInputForm from "./MobileInputForm";
import OTPInputForm from "./OTPInputForm";
import NumberVerified from "./NumberVerified";
import { setProgress } from "@/redux/progressSlice";
import EnterName from "../OnBoarding/EnterName";
import AddJobRole from "../OnBoarding/AddJobRole";
import AddSkills from "../OnBoarding/AddSkills";
import AddLocation from "../OnBoarding/AddLocation";
import AddEducation from "../OnBoarding/AddEducation";
import AddExperience from "../OnBoarding/AddExperience";
import AddMoreExperience from "../OnBoarding/AddMoreExperience";
import OnBoardingComplete from "../OnBoarding/OnBoardingComplete";

const index = ({ closePopup }: { closePopup: () => void }) => {
  const progress = useAppSelector((state) => state.progress.value);
  const { is_fresher } = useAppSelector((state) => state.user); // Access progress state
  const [dialogSize, setDialogSize] = useState<"md" | "xxl">("md");
  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (progress == 11 && is_fresher == 2) {
      dispatch(setProgress(progress - 2));
    } else {
      dispatch(setProgress(progress - 1));
    }
  };

  useEffect(() => {
      dispatch(setProgress(2));
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setDialogSize("xxl");
      } else {
        setDialogSize("md");
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize); // Listen for screen changes
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <MobileInputForm size={dialogSize} closePopup={closePopup} />
      <OTPInputForm
        size={"600px"}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <NumberVerified size={dialogSize} closePopup={closePopup} />
      <EnterName size={dialogSize} closePopup={closePopup} />
      <AddJobRole
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <AddSkills
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <AddLocation
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <AddEducation
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <AddExperience
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <AddMoreExperience
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />
      <OnBoardingComplete
        size={dialogSize}
        closePopup={closePopup}
        onClose={closePopup}
      />
    </>
  );
};

export default index;
