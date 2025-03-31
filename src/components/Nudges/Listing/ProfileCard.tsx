"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export default function ProfileCard() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCompleteProfile = () => {
    router.push("/my-profile");
  };

  return (
    <div className="bg-white rounded-2xl px-4 xl:px-6 py-5 xl:py-8 w-full">
      <div className="flex flex-col items-center">
        <Image
          className="cursor-pointer mx-auto rounded-full object-cover border size-[70px] 2xl:size-[102px] mb-2"
          src={
            user?.photo_url ? user?.photo_url : "/new-assets/icons/avatar.svg"
          }
          width={287}
          height={253}
          alt={user?.name || "user profile"}
        />
        <h3 className="text-[16px] lg:text-sm text-center 2xl:text-base 3xl:text-lg font-semibold mb-2 lg:mb-[2px]">
          {user?.name}
        </h3>
        <p className="text-xs text-center 2xl:text-sm text-[#4D4D4F] mb-3">
          {user?.designation}
        </p>
        <p className="mb-2 text-xs text-center 2xl:text-sm font-medium">
          Complete your profile
        </p>
        <div className="flex items-center gap-2 w-full">
          <div className="w-full h-[6px] 2xl:h-2 rounded-lg bg-[#CCCCCC]">
            <div
              className="rounded-lg h-full bg-red"
              style={{ width: `${user?.profilePercentage || 0}%` }}
            ></div>
          </div>{" "}
          <span className="text-xs 2xl:text-sm">
            {user?.profilePercentage || 0}%
          </span>
        </div>
        <button
          onClick={handleCompleteProfile}
          className="mt-3 md:mt-4 w-fit !text-red btn-border !border-red !text-xs"
        >
          Complete Your Profile Now
        </button>
      </div>
    </div>
  );
}
