"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { ArrowLeft } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import MainTabs from "./components/MainTabs";
import { FormData } from "@/types/formTypes";
import PreferencesTab from "./components/tabs/PreferencesTab";
import BasicInfoTab from "./components/tabs/BasicInfoTab";
import MyProfilePanel from "./components/panels/MyProfilePanel";

// Main Profile Module Component
export default function ProfileModule() {
  const [selectedMainTab, setSelectedMainTab] = useState<number>(2);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImagesChange = (value: string[]) => {
    setUploadedImages(value);
  };
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
  
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
  
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    handleImagesChange([...uploadedImages, ...newImages]);
  };
  
  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      handleImagesChange(updatedImages);
      return updatedImages;
    });
  };
  

  return (
    <div className="max-w-7xl mx-auto pb-6">
      <ul className="flex items-center gap-2 text-sm my-8">
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
      <div className="border border-gray rounded-3xl">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center space-x-2 mb-4">
          <ArrowLeft />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        {/* Main Tabs */}
        <Tab.Group
          selectedIndex={selectedMainTab}
          onChange={setSelectedMainTab}
        >
          <div className="flex p-6">
            <MainTabs
              selectedMainTab={selectedMainTab}
              setSelectedMainTab={setSelectedMainTab}
            />
            <Tab.Panels className="px-5 py-0 w-4/5">
              {/* My Account Section */}
              {selectedMainTab === 0 && (
                <MyProfilePanel
                  formData={formData}
                  images={uploadedImages}
                  handleChange={handleChange}
                  handleDeleteImage={handleDeleteImage}
                  handleImageUpload={handleImageUpload}
                />
              )}
              {/* Basic Info Section */}
              {selectedMainTab === 1 && (
                <BasicInfoTab
                  selectedSubTab={selectedSubTab}
                  setSelectedSubTab={setSelectedSubTab}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {/* Preferences Section */}
              {selectedMainTab === 2 && (
                <PreferencesTab
                  selectedSubTab={selectedSubTab}
                  setSelectedSubTab={setSelectedSubTab}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
}
