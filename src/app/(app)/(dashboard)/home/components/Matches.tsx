'use client'
import ProfileCard from '@/app/components/common/cards/ProfileCard'
import { getMatchUsers } from '@/app/lib/api/homeRoutes'
import { profiles } from '@/constants/dummyConstants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface UserData {
  _id: string;
  name: string;
  gender?: string;
  age?: string;
  dateOfBirth?: string;
  height?: string;
  occupation?: string;
  city?: string;
  createdAt: string;
  userImages?: string[];
  recentlyViewed?: string[];
  FamilyDetails?: {
    city?: string;
  };
}

interface ProfileCardProps {
  id: string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  occupation: string;
  location: string;
  image?: string;
}
const Matches = () => {
  const [newUsers, setNewUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMatchUsersList = async () => {
      try {
        setLoading(true);
        const {data} = await getMatchUsers();
        
        // Assuming response is the array of user objects
        // if (data?.newUsers && Array.isArray(data?.newUsers)) {
        //   // Filter users with complete profiles and images
        //   const validUsers = data?.newUsers.filter((user: UserData) => 
        //     user.gender === 'female' && user.userImages && user.userImages.length > 0
        //   );
          
        //   // Set users for different sections
        //   setNewUsers(validUsers.slice(0, 10)); // First 10 users for New Joined
          
        //   // For suggested users, using a different slice of the same data
        //   setSuggestedUsers(validUsers.slice(5, 15));
          
        //   // For recently viewed, using users with recentlyViewed data
        //   const withRecentViews = validUsers.filter((user: UserData) => 
        //     user.recentlyViewed && user.recentlyViewed.length > 0
        //   );
        //   setRecentlyViewedUsers(withRecentViews.length > 0 ? withRecentViews : validUsers.slice(2, 12));
        // }
      } catch(error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    useEffect(() => {
      getMatchUsersList();
    }, []);
  
    // Helper function to format user data for ProfileCard component
    const formatUserForCard = (user: UserData): ProfileCardProps => {
      return {
        id: user._id,
        isNew: new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if created within the last week
        verified: true, // You might want to adjust this based on your actual verification logic
        name: user.name,
        age: user.age || calculateAge(user.dateOfBirth),
        height: user.height || "Not specified",
        occupation: user.occupation || "Not specified",
        location: user.city || (user.FamilyDetails && user.FamilyDetails.city) || "Not specified",
        image: user.userImages && user.userImages.length > 0 ? user.userImages[0] : undefined
      };
    };
  
    // Helper function to calculate age from DOB
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
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recently Viewed</h2>
            <Link href="#">
              <span className="text-orange-500 font-semibold">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {profiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Suggested For You</h2>
            <Link href="#">
              <span className="text-orange-500 font-semibold">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {profiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </div>
        </section>
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <Link href="#">
              <span className="text-orange-500 font-semibold">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {profiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </div>
        </section>
      </main>
  )
}

export default Matches