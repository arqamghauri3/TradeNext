'use client'
import AdvanceChartWidget from "@/components/AdvanceChartWidget";
import PageHeader from "@/components/PageHeader";
import { LucideTrash2, MoveIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout, Layouts } from "react-grid-layout";


export default function Workspace() {

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);


  // Define initial layouts with proper typing
  const initialLayouts: Layouts = {
    lg: [
      { i: "c-1", x: 0, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
      { i: "c-2", x: 6, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
    ],
    md: [
      { i: "c-1", x: 0, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
      { i: "c-2", x: 6, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
    ],
    sm: [
      { i: "c-1", x: 0, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
      { i: "c-2", x: 6, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
    ],
    xs: [
      { i: "c-1", x: 0, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
      { i: "c-2", x: 6, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
    ],
    xxs: [
      { i: "c-1", x: 0, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
      { i: "c-2", x: 6, y: 0, w: 6, h: 30, resizeHandles: ["se", "s", "n", "e", "ne", "nw", "sw", "w"] },
    ],
  };
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);

  return (
    <>
      <PageHeader title="Dashboard" />
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={8}
        onLayoutChange={(currentLayout, allLayouts) => {
          // currentLayout is for the active breakpoint, allLayouts is the full map
          setLayouts(allLayouts);
        }}
        draggableHandle=".tile-handle"
      >
        <div key="c-1" className=" border border-red-200 rounded overflow-hidden">
          <div className="px-4 py-1 border-b">
            <div className="flex justify-center">
              <div className="tile-handle  cursor-move">
                <MoveIcon />
              </div>
              <LucideTrash2 />
            </div>
          </div>
          <AdvanceChartWidget height="50%" />
        </div>
        <div key="c-2" className="rounded overflow-hidden">
          <div className="px-4 py-1">
            <div className="flex justify-center">
              <div className="tile-handle cursor-move">
                <MoveIcon />
              </div>
              <LucideTrash2 />
            </div>
          </div>
          <AdvanceChartWidget height="50%" />
        </div>
      </ResponsiveReactGridLayout>
    </>

  );
}