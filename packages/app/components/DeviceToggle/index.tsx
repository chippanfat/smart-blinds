import React, { ReactElement } from "react";
import Toggle from "app/components/Toggle";
import { useUpdateDeviceState } from "app/hooks/useUpdateDeviceState";

export default function DeviceToggle({
  id,
  state,
}: {
  id: string;
  state: boolean;
}): ReactElement {
  const { trigger } = useUpdateDeviceState(id);
  return (
    <Toggle
      id={id}
      state={state}
      onChange={(_id, state) => {
        trigger({
          body: { state },
          method: "PATCH",
        });
      }}
    />
  );
}
