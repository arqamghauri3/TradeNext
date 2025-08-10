import AdvanceChartWidget from "@/components/AdvanceChartWidget";
import CryptoScreener from "@/components/CryptoScreener";
import TopStories from "@/components/TopStories";
import WatchList from "@/components/WatchList";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 border">
        <AdvanceChartWidget />
      </div>
      <div className="col-span-4 border">
        <WatchList />
      </div>
      <div className="col-span-8 border">
        <CryptoScreener />
      </div>
      <div className="col-span-4 border">
        <TopStories />
      </div>
    </div>
  );
};

export default page;
