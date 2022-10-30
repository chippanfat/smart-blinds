import React, { ReactElement } from "react";
import ModalWrapper from "app/components/ModalWrapper";
import Device from "app/components/Device";
import DeviceListWrapper from "app/components/DeviceListWrapper";
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
        <DeviceListWrapper>
          <Device
            key="livingroom"
            label="Living Room"
            action={
              <Toggle
                id=""
                state
                onChange={() => {
                  console.log("vv");
                }}
              />
            }
          />
        </DeviceListWrapper>
      </>
    </ModalWrapper>
  );
}
