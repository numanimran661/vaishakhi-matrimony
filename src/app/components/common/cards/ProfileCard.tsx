"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import {
  BriefcaseIcon,
  FemalePlaceholder,
  LocationMarker,
  MalePlaceholder,
  MessageIcon,
  ReqSendIcon,
  VerifiedIcon,
} from "../allImages/AllImages";
import { useRouter } from "next/navigation";
import { sendInterest } from "@/app/lib/api/homeRoutes";
import { showToast } from "../../ui/CustomToast";

type ProfileCardProps = {
  id: string;
  image?: StaticImageData | string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  occupation: string;
  location?: string;
  gender?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  image,
  isNew,
  verified,
  name,
  age,
  height,
  occupation,
  location,
  gender,
}) => {
  const router = useRouter();

  const handleInterestSend = async () => {
    const {status} = await sendInterest({receiverId: id})
    if(status === 200){
      showToast("Interest Sent Successfully", 'success')
    } else {
      showToast("Error occured while sending Interest", 'error')
    }
  }
  return (
    <div
      className="bg-white shadow rounded-xl relative"
      onClick={() => router.push(`/home/profile-details/${id}`)}
    >
      <img
        src={
          image
            ? typeof image === "string"
              ? image // Use the string directly
              : image.src
            : gender === "male"
            ? MalePlaceholder.src
            : FemalePlaceholder.src
        }
        alt="Profile Picture"
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="mt-1">
        <div className="flex items-center space-x-2">
          {isNew && (
            <span
              className={`text-sm text-white px-2 py-1 rounded-3xl absolute top-3 left-2 ${
                image ? "blur-bg" : "bg-gray"
              }`}
            >
              New
            </span>
          )}
          {verified && (
            <span
              className={`text-sm text-white p-2 rounded-full absolute top-3 right-2 ${
                image ? "blur-bg" : "bg-gray"
              }`}
            >
              <VerifiedIcon width={16} height={16} />
            </span>
          )}
        </div>
        <div className="px-3 pb-3 flex flex-col gap-2">
          <div>
            <h3 className="font-bold text-lg mt-2">{name}</h3>
            <p className="text-sm text-normal">{`Age ${age}, ${height}`}</p>
          </div>
          <p className="text-sm text-normal flex items-center gap-1">
            <BriefcaseIcon />
            {occupation}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-normal flex items-center gap-1">
              <LocationMarker width="20px" />
              {location}
            </p>
            <div className="flex gap-1 items-center">
              <span className="rounded-full bg-lightGray p-2 cursor-pointer" onClick={handleInterestSend}>
                <ReqSendIcon width={14} height={14} />
              </span>
              <span
                className="rounded-full bg-orange-50 p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/home/messages");
                }}
              >
                <MessageIcon width={14} height={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
