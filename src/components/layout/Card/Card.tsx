import React, { ReactNode } from "react";

import { getTypographyStyles } from "@/components/ui/Typography/Typography";

export interface CardTitleProps {
  children: ReactNode;
}

const CardTitle = ({ children }: CardTitleProps) => {
  const { className, style } = getTypographyStyles("title", "large");
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export interface CardBodyProps {
  children: ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
  const { className, style } = getTypographyStyles("body", "medium");

  return (
    <div
      className={`flex flex-col p-4 ${className} text-on-surface-variant`}
      style={style}
    >
      {children}
    </div>
  );
};

export { CardTitle, CardBody };

export interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex flex-col bg-surface-container-low rounded-[24px] w-fit overflow-clip">
      {children}
    </div>
  );
};

export default Card;
