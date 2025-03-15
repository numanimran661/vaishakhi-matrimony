"use client";
import { useEffect, useState } from "react";
import { TabGroup, TabPanels } from "@headlessui/react";
import { ArrowLeft } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import MainTabs from "./components/MainTabs";
import type { FormData } from "@/types/formTypes";
import PreferencesTab from "./components/tabs/PreferencesTab";
import BasicInfoTab from "./components/tabs/BasicInfoTab";
import MyAccountTab from "./components/tabs/MyAccountTab";
import { mainTabs } from "@/constants/formConstants";
import { getUserProfile, updateUserProfile } from "@/app/lib/api/profileRoutes";
import { showToast } from "@/app/components/ui/CustomToast";

// Main Profile Module Component
const ProfilePage = () => {
  const [selectedMainTab, setSelectedMainTab] = useState<number>(0);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImagesChange = (value: string[]) => {
    setUploadedImages(value);
  };
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    handleImagesChange([...uploadedImages, ...newImages]);
    setImages(Array.from(files));
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      handleImagesChange(updatedImages);
      return updatedImages;
    });
  };

  const handleSubmit = async (formData: any) => {
    try {
      const formDataToSend = {
        ...formData,
        // userImages: images
      };
      const { data, status } = await updateUserProfile(formDataToSend);
      if (status === 200) {
        showToast(data?.message, "success");
        getUsersProfile();
      } else {
        showToast(data?.message, "error");
      }
    } catch (error) {}
  };

  const getUsersProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.data?.user) {
        const { horoscopeDetails, FamilyDetails, Education, ...restUser } = response?.data?.user || {};

        setFormData({
          ...horoscopeDetails,
          ...FamilyDetails,
          ...Education,
          ...restUser,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsersProfile();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <ul className="hidden sm:flex items-center gap-2 text-sm my-8">
        <li>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li className="text-gray-400">
          <span>›</span>
        </li>
        <li>
          <span className="text-primary">Profile</span>
        </li>
      </ul>
      <div className="md:border border-gray rounded-3xl">
        {/* Mobile Header */}
        <div
          className="md:hidden flex items-center space-x-2 mb-4"
          onClick={() => setSelectedSubTab(0)}
        >
          <ArrowLeft />
          <h2 className="text-lg font-semibold">{mainTabs[selectedMainTab]}</h2>
        </div>
        <TabGroup
          selectedIndex={selectedMainTab}
          onChange={(tab) => {
            setSelectedMainTab(tab);
            setSelectedSubTab(0);
          }}
        >
          <div className="flex md:p-6">
            <MainTabs />
            <TabPanels className="md:px-5 py-0 w-full md:w-4/5">
              {selectedMainTab === 0 && (
                <MyAccountTab
                  formData={formData}
                  images={uploadedImages}
                  // handleChange={handleChange}
                  handleDeleteImage={handleDeleteImage}
                  handleImageUpload={handleImageUpload}
                  handleFormSubmit={handleSubmit}
                />
              )}
              {selectedMainTab === 1 && (
                <BasicInfoTab
                  selectedSubTab={selectedSubTab}
                  setSelectedSubTab={setSelectedSubTab}
                  formData={formData}
                  handleChange={handleChange}
                  handleFormSubmit={handleSubmit}
                />
              )}
              {selectedMainTab === 2 && (
                <PreferencesTab
                  selectedSubTab={selectedSubTab}
                  setSelectedSubTab={setSelectedSubTab}
                  formData={formData}
                  handleChange={handleChange}
                  handleFormSubmit={handleSubmit}
                />
              )}
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
};

export default ProfilePage;
