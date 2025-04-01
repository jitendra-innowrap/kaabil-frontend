import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Drawer
} from "@material-tailwind/react";
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

const RenderModelDrawer = ({ size, children }: { size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"; children: React.ReactNode }) => {
  switch (size) {
    case "xxl":
      return <Drawer
        overlay={true}
        placement="bottom"
        open={true}
        size="100%"
        onClose={() => {}}
        className="overflow-hidden"
      >
        <DialogBody>
          {children}
        </DialogBody>
      </Drawer>;
    default:
      return  <Dialog
        open={true}
        handler={() => {}}
        className="overflow-hidden"
        size={size as "xs" | "sm" | "md" | "lg" | "xl" | "xxl"}
      >
          {children}
      </Dialog>;
  }
};

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
      dispatch(setProgress(3));
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
    <RenderModelDrawer size={dialogSize}>
      {progress == 1 && <MobileInputForm size={dialogSize} closePopup={closePopup} />}
      {progress == 2 && <OTPInputForm
        size={dialogSize}
        closePopup={closePopup}
        handleBack={handleBack}
      />}
      {progress == 3 && <NumberVerified size={dialogSize} closePopup={closePopup} />}
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
    </RenderModelDrawer>
  );
};

export default index;
