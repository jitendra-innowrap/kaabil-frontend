"use client";
import React, { use, useEffect } from "react";
import ProfileList from "./ProfileList";
import ResumeModal from "./ResumeModal";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import ProfileModal from "./ProfileModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProfile } from "@/redux/profileSlice";

const Profile = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProfile({ token: token, data: { latitude: 0, longitude: 0 } })
    );
  }, [token]);

  return (
    <div className="container">
      <ProfileModal />
      <ExperienceModal />
      <EducationModal />
      <ResumeModal />
      <ProfileList />
    </div>
  );
};

export default Profile;
