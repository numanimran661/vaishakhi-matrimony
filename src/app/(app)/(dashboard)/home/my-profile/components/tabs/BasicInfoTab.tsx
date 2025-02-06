import { FormData } from "@/types/formTypes";
import { TabGroup, TabPanels } from "@headlessui/react";
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
    <TabGroup selectedIndex={selectedSubTab} onChange={setSelectedSubTab}>
      <SubTabs
        tabsList={basicInfoTabs}
      />
      <TabPanels className="mt-4">
        {selectedSubTab === 0 && (
          <BasicInfoPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 1 && (
          <PersonalPanel formData={formData} handleChange={handleChange} />
        )}
      </TabPanels>
    </TabGroup>
  );
};

export default BasicInfoTab;
