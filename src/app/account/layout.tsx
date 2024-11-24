import SideNavigation from "@/components/SideNavigation";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
