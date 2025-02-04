import { FormData } from "@/types/formTypes";
import { Tab } from "@headlessui/react";
import React from "react";
import SubTabs from "../SubTabs";
import BasicInfoPanel from "../panels/BasicInfoPanel";
import { basicInfoTabs } from "@/constants/formConstants";
import PersonalPanel from "../panels/PersonalPanel";

interface PreferencesTabProps {
  selectedSubTab: number;
  setSelectedSubTab: (index: number) => void;
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

const BasicInfoTab = ({
  selectedSubTab,
  setSelectedSubTab,
  formData,
  handleChange,
}: PreferencesTabProps) => {
  return (
    <Tab.Group selectedIndex={selectedSubTab} onChange={setSelectedSubTab}>
      <SubTabs
        selectedSubTab={selectedSubTab}
        setSelectedSubTab={setSelectedSubTab}
        tabsList={basicInfoTabs}
      />
      <Tab.Panels className="mt-4">
        {selectedSubTab === 0 && (
          <BasicInfoPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 1 && (
          <PersonalPanel formData={formData} handleChange={handleChange} />
        )}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default BasicInfoTab;
