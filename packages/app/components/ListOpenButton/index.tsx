import React, { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ListOpenButton({
  onClick,
}: {
  onClick: () => void;
}): ReactElement {
  return (
    <PlusIcon
      className="w-6 text-indigo-600 cursor-pointer"
      role="button"
      onClick={onClick}
    />
  );
}
