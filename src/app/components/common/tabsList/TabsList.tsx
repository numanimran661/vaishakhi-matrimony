import React from "react";

type TabItem = {
  title: string;
  component: React.FC
};

type TabsListProps = {
  tabs: TabItem[];
  activeTab: TabItem;
  handleTabChange: (key: number) => void;
};
export const TabsList: React.FC<TabsListProps> = ({
  tabs,
  activeTab,
  handleTabChange,
}) => {
  return (
    <header className="max-w-7xl mx-auto border-b border-gray">
      <div className="flex justify-between mt-8">
        <div className="flex gap-3">
          {tabs &&
            tabs.length > 0 &&
            tabs.map((item, key) => (
              <div
                className={`font-semibold py-3 px-2 cursor-pointer text-nowrap ${
                  item.title == activeTab.title ? "text-orange-500 border-b border-primary" : "text-darkBlue"
                }`}
                key={key}
                onClick={() => handleTabChange(key)}
              >
                <span>{item.title}</span>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
};
