import React, { useState } from "react";

const Resume = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-lg mt-3 px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/resume.svg" alt="Resume Icon" />
            <h1 className="text-[#231F20] font-semibold text-md">Resume</h1>
          </div>
        </div>
        <div className="col-span-12 mt-4">
          <div className="relative flex items-center w-full p-2 bg-white border border-[#4D4D4F66] rounded-lg cursor-pointer">
            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            {/* File Name Display */}
            <label
              htmlFor="fileInput"
              className="flex-grow text-sm text-gray-700 px-3 cursor-pointer"
            >
              {fileName || "No file chosen"}
            </label>
            {/* Icon */}
            <label
              htmlFor="fileInput"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500 cursor-pointer"
            >
              <img src="/new-assets/icons/attach_file.svg"/>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
