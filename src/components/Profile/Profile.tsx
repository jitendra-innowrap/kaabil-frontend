"use client";
import React, { use, useEffect, useState } from "react";
import ProfileList from "./ProfileList";
import ResumeModal from "./ResumeModal";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import ProfileModal from "./ProfileModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProfile } from "@/redux/profileSlice";
import { AboutModal } from "./AboutModal";
import AddMoreExperienceModal from "./AddMoreExperienceModal";

const Profile = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [dialogSize, setDialogSize] = useState<"md" | "xxl">("md");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProfile({ token: token, data: { latitude: 0, longitude: 0 } })
    );
  }, [token]);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setDialogSize("xxl");
      } else {
        setDialogSize("md");
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="container mobile-container-zero-padding">
      <AddMoreExperienceModal />
      <ProfileList />
      <ExperienceModal size={dialogSize} />
      <ProfileModal size={dialogSize} />
      <EducationModal size={dialogSize} />
      <ResumeModal size={dialogSize} />
      <AboutModal size={dialogSize} />
    </div>
  );
};

export default Profile;
