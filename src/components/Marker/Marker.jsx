import React from "react";
import { OverlayView } from "@react-google-maps/api";

import { ReactComponent as Icon } from "../../svg/excalibur.svg";

export const Marker = ({ position, children }) => {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_LAYER}>
      <>
        <Icon width={20} fill="red" />
      </>
    </OverlayView>
  );
};
