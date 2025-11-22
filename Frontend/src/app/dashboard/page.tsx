import AdvanceChartWidget from "@/components/AdvanceChartWidget";
import CryptoScreener from "@/components/CryptoScreener";
import EconomicCalendar from "@/components/EconomicCalendar";
import PageHeader from "@/components/PageHeader";
import TopStories from "@/components/TopStories";
import WatchList from "@/components/WatchList";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-12 gap-6 ml-7 min-h-screen">
        <div className="col-span-8  border">
          <EconomicCalendar />
        </div>
        <div className="col-span-4 border">
          <div className="flex flex-col gap-3 h-full">
            <div className="border border-gray-700 h-full"><TopStories /></div>
            <div className="border border-gray-700 h-full"><WatchList /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
