import React, { ReactElement } from "react";
import ModalWrapper from "app/components/ModalWrapper";
import Device from "app/components/Device";
import DeviceListWrapper from "app/components/DeviceListWrapper";
import Toggle from "app/components/Toggle";

export default function DeviceGroupModal({
  openModal,
  onClose,
}: {
  openModal: boolean;
  onClose: () => void;
}): ReactElement {
  return (
    <ModalWrapper
      title="Add a device to this group"
      description="Enable a device to be part of this group. Devices can be in multiple groups."
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
        <DeviceListWrapper>
          <Device
            key="bedroom"
            label="Bedroom"
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
