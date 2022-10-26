import React, { ReactElement, useState } from "react";

export default function Device({
  id,
  state,
  onChange,
}: {
  id: string;
  state: boolean;
  onChange: (id: string, state: boolean) => void;
}): ReactElement {
  const [checked, setChecked] = useState<boolean>(state);

  return (
    <span className="ml-auto hover:text-neutral-600">
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={checked}
          className="sr-only peer"
          onChange={(e) => {
            setChecked(e.target.checked);
            onChange(id, e.target.checked);
          }}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
      </label>
    </span>
  );
}
