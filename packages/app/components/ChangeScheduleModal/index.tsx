import React, { ReactElement } from "react";
import ModalWrapper from "app/components/ModalWrapper";
import Toggle from "app/components/Toggle";

export default function ChangeScheduleModal({
  openModal,
  onClose,
}: {
  openModal: boolean;
  onClose: () => void;
}): ReactElement {
  return (
    <ModalWrapper
      title="Update Schedule"
      description="Update these settings to suit your schedule."
      isOpen={openModal}
      onSave={() => {
        console.log("on save");
        onClose();
      }}
      onClose={() => {
        onClose();
      }}
    >
      <>
        <form className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">Schedule Name</span>
            <input
              type="text"
              name="schedule_name"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
            <div
              style={{
                position: "relative",
                height: "0px !important",
                width: "0px !important",
                float: "left",
              }}
            ></div>
          </label>

          <label className="block">
            <span className="text-gray-700">Schedule Start</span>
            <input
              type="datetime-local"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Schedule Frequency</span>
            <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </label>

          <label className="block flex mt-4 mb-4">
            <span className="text-gray-700">Enabled</span>
            <Toggle
              id=""
              state
              onChange={() => {
                console.log("enabled");
              }}
            />
          </label>
        </form>
      </>
    </ModalWrapper>
  );
}
