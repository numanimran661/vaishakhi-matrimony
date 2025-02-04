import { subTabs } from "@/constants/formConstants";
import { Tab } from "@headlessui/react";

interface SubTabsProps {
  selectedSubTab: number;
  setSelectedSubTab: (index: number) => void;
  tabsList: string[];
}

// Sub Tabs Component
const SubTabs = ({ selectedSubTab, setSelectedSubTab, tabsList }: SubTabsProps) => (
  <Tab.List className="flex space-x-4 border-b border-gray overflow-x-auto w-full">
    {tabsList.map((tab, index) => (
      <Tab
        key={tab}
        className={({ selected }: { selected: boolean }) =>
          `px-4 py-2 text-sm font-medium text-normal border-b-2 transition-all outline-none ${
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
);

export default SubTabs;
