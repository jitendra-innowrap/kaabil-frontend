import React from "react";
import ProfileList from "./ProfileList";
import ResumeModal from "./ResumeModal";
import EducationModal from "./EducationModal";

const Profile = () => {
  return (
    <div className="container">
      <EducationModal />
      <ResumeModal />
      <ProfileList />
    </div>
  );
};

export default Profile;
