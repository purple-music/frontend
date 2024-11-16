import { useState } from "react";

import { StudiosSelector } from "@/app/[lng]/my/view/_components/StudiosSelector";
import { studios } from "@/app/[lng]/my/view/_data/studios";
import { StudioId } from "@/lib/types";

import { PresetSelector } from "./PresetSelector";

type GetLabel = (studio: StudioId) => string;
const getShortest: GetLabel = (studio) => studio.substring(0, 1).toUpperCase();
const getShort: GetLabel = (studio) => studio.substring(0, 3).toUpperCase();
const getFull: GetLabel = (studio) => studio.toUpperCase();

export function View() {
  const [days, setDays] = useState<number>(7);
  const [selectedStudios, setSelectedStudios] = useState<StudioId[]>(studios);

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-between">
        <StudiosSelector
          selectedStudios={selectedStudios}
          selectStudios={setSelectedStudios}
        />
        <PresetSelector day={days} onDaySelect={setDays} />
      </div>
      {/* <TimelineWrapper days={days} studios={selectedStudios} /> */}
    </>
  );
}

