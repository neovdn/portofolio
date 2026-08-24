"use client";

import React, { useState } from "react";
import { githubData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export function ContributionGrid() {
  const [hoveredCell, setHoveredCell] = useState<{
    week: number;
    day: number;
    count: number;
  } | null>(null);

  // Intensity color map (strictly monochromatic)
  const getCellColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[#EBEBE8] border-[#DFDFDC]";
      case 1:
        return "bg-[#D0D0CC] border-[#B8B8B4]";
      case 2:
        return "bg-[#8A8A86] border-[#737370]";
      case 3:
        return "bg-[#454542] border-[#2E2E2C]";
      case 4:
        return "bg-[#111111] border-[#000000]";
      default:
        return "bg-[#EBEBE8] border-[#DFDFDC]";
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[680px] flex flex-col gap-2">
        {/* Heatmap Grid */}
        <div className="flex gap-1.5 items-start">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between h-[84px] py-1 text-[10px] font-mono text-[#737373] pr-2 select-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* 52 Columns of Weeks */}
          <div className="flex gap-[3.5px]">
            {githubData.contributionMatrix.map((weekDays, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                {weekDays.map((level, dayIdx) => (
                  <div
                    key={dayIdx}
                    onMouseEnter={() =>
                      setHoveredCell({
                        week: weekIdx + 1,
                        day: dayIdx,
                        count: level === 0 ? 0 : level * 2 + 1,
                      })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    className={cn(
                      "w-[11px] h-[11px] rounded-[2px] border transition-transform duration-150 cursor-pointer hover:scale-125",
                      getCellColor(level)
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend & Hover Status Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-[#EBEBE8] text-[11px] font-mono text-[#737373]">
          <div>
            {hoveredCell ? (
              <span className="text-[#111111] font-semibold">
                {hoveredCell.count} contribution{hoveredCell.count === 1 ? "" : "s"} on Week {hoveredCell.week}
              </span>
            ) : (
              <span>{githubData.totalContributions} total contributions in the last year</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 select-none">
            <span className="text-[10px]">Less</span>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#EBEBE8] border border-[#DFDFDC]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#D0D0CC] border border-[#B8B8B4]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#8A8A86] border border-[#737370]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#454542] border border-[#2E2E2C]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#111111] border border-[#000000]" />
            <span className="text-[10px]">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
