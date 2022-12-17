import React, { ReactElement, useState } from "react";
import ModalWrapper from "app/components/ModalWrapper";
import Device from "app/components/Device";
import DeviceListWrapper from "app/components/DeviceListWrapper";
import Toggle from "app/components/Toggle";
import { Device as DeviceInterface } from "app/types/Device.interface";
import { Group as GroupInterface } from "app/types/Group.interface";

export default function DeviceGroupModal({
  openModal,
  onSave,
  onClose,
  allDevices,
  currentGroup,
}: {
  openModal: boolean;
  onSave: (groupId: string, deviceIds: string[]) => void;
  onClose: () => void;
  allDevices: DeviceInterface[];
  currentGroup: GroupInterface;
}): ReactElement {
  const [enabledDeviceList, setEnabledDeviceList] = useState<string[]>(
    currentGroup.devices
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  function isDeviceInGroup(
    groupDevices: string[],
    searchDevice: string
  ): boolean {
    return groupDevices.includes(searchDevice);
  }

  function handleToggleOnChange(deviceId: string, state: boolean): void {
    setEnabledDeviceList((prevState) => {
      if (state) {
        prevState.push(deviceId);
      }

      if (!state) {
        prevState.splice(prevState.indexOf(deviceId), 1);
      }

      return prevState;
    });
  }
  function RenderDeviceList(): ReactElement | null {
    const list = allDevices.map((device) => {
      return (
        <DeviceListWrapper key={`devicelistwrapper-${device._id}`}>
          <Device
            key={device._id}
            label={device.name}
            action={
              <Toggle
                id={device._id}
                state={isDeviceInGroup(currentGroup.devices, device._id)}
                onChange={handleToggleOnChange}
              />
            }
          />
        </DeviceListWrapper>
      );
    });

    return <>{list}</>;
  }

  return (
    <ModalWrapper
      title="Add a device to this group"
      description="Control multiple devices as one"
      isOpen={openModal}
      onSave={() => {
        setIsSaving(true);
        // onSave(currentGroup._id, enabledDeviceList);
      }}
      onClose={() => {
        onClose();
      }}
      isSaving={isSaving}
    >
      <RenderDeviceList />
    </ModalWrapper>
  );
}
