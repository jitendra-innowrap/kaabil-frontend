"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
interface prop {
  closeSideMenu?: () => void;
}
export default function ProfileCard({ closeSideMenu }: prop) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCompleteProfile = () => {
    closeSideMenu?.();
    router.push("/my-profile");
  };

  return (
    <div className="bg-white rounded-2xl py-5 xl:py-8 w-full">
      <div className="flex flex-col items-start">
        <div className="flex gap-3 w-full justify-start">
          <Image
            className="cursor-pointer rounded-full object-cover border size-[52px] mb-2"
            src={
              user?.photo_url ? user?.photo_url : "/new-assets/icons/avatar.svg"
            }
            width={287}
            height={253}
            alt={user?.name || "user profile"}
          />
          <div className="w-full">
            <h3 className="text-[14px] leading-[138%] font-semibold lg:mb-[2px]">
              {user?.name}
            </h3>
            <p className="text-xs leading-5 text-[#4D4D4F] mb-2">
              {user?.designation}
            </p>
            <p className="mb-1 text-[10px] leading-[120%] 2xl:text-sm font-medium">
              {user?.profilePercentage == 100
                ? "Your profile is 100% complete!"
                : "Complete your profile"}
            </p>
            <div className="flex items-center gap-2 w-full">
              <div className="w-full h-[6px] 2xl:h-2 rounded-lg bg-[#CCCCCC]">
                <div
                  className={`rounded-lg h-full ${user?.profilePercentage==100?"bg-[#019e43]":" bg-red"}`}
                  style={{ width: `${user?.profilePercentage || 0}%` }}
                ></div>
              </div>{" "}
              <span className="text-xs 2xl:text-sm">
                {user?.profilePercentage || 0}%
              </span>
            </div>
          </div>
        </div>
        {user?.profilePercentage !== 100 && (
          <button
            onClick={handleCompleteProfile}
            className="mt-3 w-full md:mt-4 !text-red btn-border !border-red !text-xs"
          >
            Complete Your Profile Now
          </button>
        )}
      </div>
    </div>
  );
}
