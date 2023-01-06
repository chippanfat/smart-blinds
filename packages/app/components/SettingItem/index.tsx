import React, { ReactElement } from "react";
import Device from "app/components/Device";
import Toggle from "app/components/Toggle";
import DeviceListWrapper from "app/components/DeviceListWrapper";
import { Setting } from "app/types/Setting.interface";
import { useUpdateSettingState } from "../../hooks/useUpdateSettingState";

export default function SettingItem({
  setting,
}: {
  setting: Setting;
}): ReactElement {
  const { trigger } = useUpdateSettingState(setting._id);

  function onChange(state: boolean): void {
    trigger({
      body: { state },
      method: "PATCH",
    });
  }

  return (
    <DeviceListWrapper key={`${setting._id}`}>
      <Device
        key={`${setting._id}-${setting.name}`}
        label={setting.name}
        action={
          <Toggle
            id={setting._id}
            state={setting.enabled}
            onChange={(_id, state) => {
              onChange(state);
            }}
          />
        }
      />
    </DeviceListWrapper>
  );
}
