import React from "react";
import { experiences } from "../utils";

const Experience = () => {
  return (
    <div className="bg-white rounded-lg mt-3 px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/briefcase-exprience.svg" />
            <h1 className="text-[#231F20] font-semibold text-md">Experience</h1>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/new-assets/icons/ink_marker.svg"
              className="h-3 mt-1"
              alt=""
            />
            <span className="text-sm font-bold text-red">Edit</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 pr-2 mt-5 gap-3">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="col-span-12 bg-white p-3 rounded-lg shadow-md light-shadow"
          >
            <div className="flex items-center gap-4">
              {/* Image Section */}
              <div>
                <img src={exp.icon} alt={`${exp.title} icon`} />
              </div>
              {/* Text Section */}
              <div>
                <h1 className="text-sm text-[#231F20] font-medium">{exp.title}</h1>
                <h1 className="text-xs text-[#231F20]">{exp.company}</h1>
                <h1 className="text-xs text-[#231F20] flex items-center gap-2">
                  {exp.type}{" "}
                  <span className="text-2xl">
                    <img src="/new-assets/icons/dot.svg" />
                  </span>{" "}
                  {exp.duration}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
