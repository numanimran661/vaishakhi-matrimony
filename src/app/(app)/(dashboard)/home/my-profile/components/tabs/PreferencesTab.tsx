import { FormData } from "@/types/formTypes";
import { TabGroup, TabPanels } from "@headlessui/react";
import React from "react";
import SubTabs from "../SubTabs";
import BasicPanel from "../panels/BasicPanel";
import ReligionPanel from "../panels/ReligionPanel";
import LocationPanel from "../panels/LocationPanel";
import EducationPanel from "../panels/EducationPanel";
import CriteriaPanel from "../panels/Criteria";
import { subTabs } from "@/constants/formConstants";

interface ProfileFormData {
  [key: string]: string;
}
interface PreferencesTabProps {
  selectedSubTab: number;
  setSelectedSubTab: (index: number) => void;
  formData: FormData;
  handleChange: (name: string, value: string) => void;
  handleFormSubmit: (values: ProfileFormData) => void;
}

const PreferencesTab = ({
  selectedSubTab,
  setSelectedSubTab,
  formData,
  handleChange,
  handleFormSubmit
}: PreferencesTabProps) => {
  return (
    <TabGroup selectedIndex={selectedSubTab} onChange={setSelectedSubTab}>
      <SubTabs
        tabsList={subTabs}
      />
      <TabPanels className="mt-4">
        {selectedSubTab === 0 && (
          <BasicPanel formData={formData} handleFormSubmit={handleFormSubmit} />
        )}
        {selectedSubTab === 1 && (
          <ReligionPanel formData={formData} handleFormSubmit={handleFormSubmit} />
        )}
        {selectedSubTab === 2 && (
          <LocationPanel formData={formData} handleFormSubmit={handleFormSubmit} />
        )}
        {selectedSubTab === 3 && (
          <EducationPanel formData={formData} handleFormSubmit={handleFormSubmit} />
        )}
        {selectedSubTab === 4 && (
          <CriteriaPanel formData={formData} handleFormSubmit={handleFormSubmit} />
        )}
      </TabPanels>
    </TabGroup>
  );
};

export default PreferencesTab;
