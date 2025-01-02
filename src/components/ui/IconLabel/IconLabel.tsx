import { clsx } from "clsx";
import { ReactNode } from "react";

import Typography from "@/components/ui/Typography/Typography";

interface IconLabelProps {
  icon: ReactNode;
  label: string;
}

const IconLabel = ({ icon, label }: IconLabelProps) => {
  return (
    <div className="flex flex-row items-center gap-2 text-on-surface-variant h-6">
      {icon}
      <Typography variant="label" component="span" size="large">
        {label}
      </Typography>
    </div>
  );
};

export default IconLabel;
