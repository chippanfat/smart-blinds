import React, { ReactElement } from "react";

export default function Device({
  label,
  action,
}: {
  label: string;
  action?: ReactElement;
}): ReactElement {
  return (
    <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
      <span className="pr-12 text-xs font-semibold tracking-widest uppercase hover:text-neutral-600">
        {label}
      </span>
      <span className="ml-auto hover:text-neutral-600">{action}</span>
    </div>
  );
}
