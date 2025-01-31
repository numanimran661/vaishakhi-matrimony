"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { ArrowLeft } from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import Link from "next/link";

const mainTabs: string[] = ["My Account", "Basic Info", "Preferences"];
const subTabs: string[] = [
  "Basic",
  "Religion",
  "Location",
  "Education",
  "Criteria",
];
const preferences = [
  { label: "Religion", name: "religion" },
  { label: "Caste", name: "caste" },
  { label: "Mother Tongue", name: "motherTongue" },
  { label: "Manglik", name: "manglik" },
  { label: "Star", name: "star" },
  { label: "Dosh", name: "dosh" },
  { label: "Birth Place", name: "birthPlace" },
  { label: "Birth Time", name: "birthTime" },
];

interface FormData {
  [key: string]: string;
}

export default function ProfileModule() {
  const [selectedMainTab, setSelectedMainTab] = useState<number>(2);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <Image src={ArrowLeft} alt="left arrow" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        {/* Main Tabs */}
        <Tab.Group
          className={"flex p-6"}
          selectedIndex={selectedMainTab}
          onChange={setSelectedMainTab}
        >
          <Tab.List className="flex flex-col pb-2 overflow-x-auto border-r border-gray">
            {mainTabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium transition-all pr-20 ${
                    selected
                      ? "text-primary border-r-2 border-primary"
                      : "text-darkBlue"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4 p-5">
            {/* Preferences Section */}
            {selectedMainTab === 2 && (
              <Tab.Group
                selectedIndex={selectedSubTab}
                onChange={setSelectedSubTab}
              >
                <Tab.List className="flex space-x-4 border-b pb-2 overflow-x-auto">
                  {subTabs.map((tab) => (
                    <Tab
                      key={tab}
                      className={({ selected }) =>
                        `px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                          selected
                            ? "border-orange-500 text-orange-500"
                            : "border-transparent text-gray-500"
                        }`
                      }
                    >
                      {tab}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-4">
                  {selectedSubTab === 1 && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {preferences.map((item) => (
                          <div key={item.name}>
                            <label className="block text-sm font-medium text-gray-700">
                              {item.label}
                            </label>
                            <select
                              className="w-full p-2 border rounded-md"
                              value={formData[item.name] || ""}
                              onChange={(e) =>
                                handleChange(item.name, e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                            </select>
                          </div>
                        ))}
                      </div>
                      <Button label="Save Changes" />
                    </div>
                  )}
                </Tab.Panels>
              </Tab.Group>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
