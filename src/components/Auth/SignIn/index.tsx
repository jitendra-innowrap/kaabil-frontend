import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogBody,
    Drawer
} from "@material-tailwind/react";
import MobileInputForm from "./MobileInputForm";
import OTPInputForm from "./OTPInputForm";
import NumberVerified from "./NumberVerified";
import {setProgress} from "@/redux/progressSlice";
import EnterName from "../OnBoarding/EnterName";
import AddJobRole from "../OnBoarding/AddJobRole";
import AddSkills from "../OnBoarding/AddSkills";
import AddLocation from "../OnBoarding/AddLocation";
import AddEducation from "../OnBoarding/AddEducation";
import AddExperience from "../OnBoarding/AddExperience";
import AddMoreExperience from "../OnBoarding/AddMoreExperience";
import OnBoardingComplete from "../OnBoarding/OnBoardingComplete";
import styles from "./signIn.module.css"

const RenderModelDrawer = ({size, children}: {
    size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    children: React.ReactNode
}) => {
    switch (size) {
        case "xxl":
            return <Drawer
                overlay={true}
                placement="bottom"
                open={true}
                // size="100%"
                style={{ width: "100%", height: "100%", maxHeight: "100vh !important", overflow: "hidden", zIndex: 9999 }}
                onClose={() => {
                } }
                className={styles.onboarding_drawer} placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                <div className={`p-[15px] min-h-[100vh]`}>
                    {children}
                </div>
            </Drawer>;
        default:
            return <Dialog
                open={true}
                handler={() => {
                } }
                className={styles.onboarding_dialog}
                size={size as "xs" | "sm" | "md" | "lg" | "xl" | "xxl"}
                placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                {children}
            </Dialog>;
    }
};

const index = ({closePopup}: { closePopup: () => void }) => {
    const progress = useAppSelector((state) => state.progress.value);
    const {is_fresher} = useAppSelector((state) => state.user); // Access progress state
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
            <button onClick={()=> dispatch(setProgress(progress + 1))}>next</button>
            <button onClick={()=> dispatch(setProgress(progress - 1))}>prev</button>
            {progress == 1 && <MobileInputForm size={dialogSize} closePopup={closePopup}/>}
            {progress == 2 && <OTPInputForm
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 3 && <NumberVerified size={dialogSize} closePopup={closePopup}/>}
            {progress == 4 && <EnterName size={dialogSize} closePopup={closePopup}/>}
            {progress == 5 && <AddJobRole
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 6 && <AddSkills
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 7 && <AddLocation
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 8 && <AddEducation
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 9 && <AddExperience
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 10 && <AddMoreExperience
                size={dialogSize}
                closePopup={closePopup}
                handleBack={handleBack}
            />}
            {progress == 11 && <OnBoardingComplete
                size={dialogSize}
                closePopup={closePopup}
                onClose={closePopup}
            />}
        </RenderModelDrawer>
    );
};

export default index;
