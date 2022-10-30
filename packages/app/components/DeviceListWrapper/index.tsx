import React, { ReactElement } from "react";

export default function DeviceListWrapper({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <div className="flex flex-col py-6 mx-auto mb-2 border-b border-gray-200 sm:flex-row lg:w-1/2">
      {children}
    </div>
  );
}
