import { ReactNode } from "react";

export function PageWrapper({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="mx-auto flex flex-col gap-6 py-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
