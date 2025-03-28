"use client";

import ProfileCard from "@/app/components/common/cards/ProfileCard";
import { showToast } from "@/app/components/ui/CustomToast";
import { getMatchUsers, sendInterest } from "@/app/lib/api/homeRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserData {
  _id: string;
  name: string;
  age?: string;
  dateOfBirth?: string;
  height?: string;
  occupation?: string;
  city?: string;
  createdAt: string;
  sentInterests: string[];
  userImages?: string[];
  recentlyViewed?: string[];
}

interface ProfileCardProps {
  id: string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  occupation: string;
  sentInterests: string[];
  location: string;
  image?: string;
  handleInterestSend: (id: string) => void;
}

const NearestMe = () => {
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState<UserData[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<UserData[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleInterestSend = async (receiverId: string) => {
    const { status } = await sendInterest({ receiverId });
    if (status === 200) {
      showToast("Interest Sent Successfully", "success");
      try {
              const { data } = await getMatchUsers("newUsers");
        
              if (data?.matchedUsers && Array.isArray(data?.matchedUsers)) {
                const validUsers = data?.matchedUsers.filter((user: UserData) => true);
        
                setRecentlyViewedUsers(validUsers.slice(0, 10));
                setSuggestedUsers(validUsers.slice(5, 15));
                setRecommendedUsers(validUsers.slice(2, 12));
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
    } else {
      showToast("Error occurred while sending Interest", "error");
    }
  };

  const fetchNearestUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getMatchUsers("newUsers");
      if (data?.matchedUsers && Array.isArray(data?.matchedUsers)) {
        const validUsers = data?.matchedUsers.filter((user: UserData) => true);

        setRecentlyViewedUsers(validUsers.slice(0, 10));
        setSuggestedUsers(validUsers.slice(5, 15));
        setRecommendedUsers(validUsers.slice(2, 12));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearestUsers();
  }, []);

  const formatUserForCard = (user: UserData): ProfileCardProps => {
    return {
      id: user._id,
      isNew: new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      verified: true,
      name: user.name,
      age: user.age || calculateAge(user.dateOfBirth),
      height: user.height || "Not specified",
      occupation: user.occupation || "Not specified",
      sentInterests: user.sentInterests,
      location: user.city || "Not specified",
      image: user.userImages?.[0],
      handleInterestSend,
    };
  };

  const calculateAge = (dateOfBirth?: string): string => {
    if (!dateOfBirth) return "Not specified";
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age.toString();
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-4 text-center">Loading profiles...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto p-4">
      {recentlyViewedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recently Viewed</h2>
            <Link href="#"><span className="text-orange-500 font-semibold">See All</span></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {recentlyViewedUsers.map(user => <ProfileCard key={user._id} {...formatUserForCard(user)} />)}
          </div>
        </section>
      )}

      {suggestedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Suggested For You</h2>
            <Link href="#"><span className="text-orange-500 font-semibold">See All</span></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {suggestedUsers.map(user => <ProfileCard key={user._id} {...formatUserForCard(user)} />)}
          </div>
        </section>
      )}

      {recommendedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <Link href="#"><span className="text-orange-500 font-semibold">See All</span></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {recommendedUsers.map(user => <ProfileCard key={user._id} {...formatUserForCard(user)} />)}
          </div>
        </section>
      )}
    </main>
  );
};

export default NearestMe;
