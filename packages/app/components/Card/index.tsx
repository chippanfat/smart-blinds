import React, { ReactElement, useState } from "react";

interface ICard {
  onSave: () => void;
}

export default function Card({ onSave }: ICard): ReactElement {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  function doSave() {
    setIsSpinning(true);

    setTimeout(function () {
      setIsSpinning(false);
    }, 5000);

    onSave();
  }

  function getButtonText() {
    if (isSpinning) {
      return (
        <svg
          className="animate-spin ml-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      );
    }

    return <span>Sync</span>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="flex grow flex-col sm:flex-row md:flex-row text-center md:text-left items-center justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <div className="sm:text-xl font-extrabold text-black dark:text-white">
          <h2 className="block">Don&apos;t see any of your devices?</h2>
          <h2 className="block text-indigo-500">Discover your devices now</h2>
        </div>
        <div className="inline-flex rounded-md shadow mt-6 md:mt-0">
          <button
            type="button"
            className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={() => doSave()}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
