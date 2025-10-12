"use client";

import AdvanceChartWidget from "@/components/AdvanceChartWidget";
import PageHeader from "@/components/PageHeader";

export default function page() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-12 gap-6 ml-7">
        <div className="col-span-12 border">
          <AdvanceChartWidget/>
        </div>
      </div>
    </>
  );
}
