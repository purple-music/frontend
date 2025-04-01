import {
  StudioNameSize,
  getSoftStudioColor,
  getStudioName,
} from "@/lib/utils/studios";

export const StudiosHeader = ({
  studios,
  studioNameSize = "name",
}: {
  studios: string[];
  studioNameSize?: StudioNameSize;
}) => (
  <div className={`flex h-8 flex-1 flex-row justify-between`}>
    {studios.map((studio) => (
      <div
        key={studio}
        className={`flex-1 ${getSoftStudioColor(studio)} flex items-center justify-center`}
      >
        {getStudioName(studio, studioNameSize)}
      </div>
    ))}
  </div>
);

export default StudiosHeader;
