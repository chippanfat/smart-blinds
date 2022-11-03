import React, { ReactElement } from "react";

export default function Device({
  label,
  subLabel,
  action,
}: {
  label: string;
  subLabel?: ReactElement;
  action?: ReactElement;
}): ReactElement {
  const SubLabel = (): ReactElement | null => {
    if (subLabel) {
      return <small className="text-gray-600">{subLabel}</small>;
    }

    return null;
  };

  return (
    <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
      <div className="pr-12 text-xs font-semibold tracking-widest hover:text-neutral-600">
        <p className="uppercase">{label}</p>
        <SubLabel />
      </div>
      <span className="ml-auto hover:text-neutral-600">{action}</span>
    </div>
  );
}
