import { Marker } from "@react-google-maps/api";

export const CurrentLocationMarker = ({ position }) => {
  return (
    // <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_LAYER}>
    //   <>{children}</>
    // </OverlayView>
    <Marker
      position={position}
      icon={{ url: "../../svg/excalibur.svg" }}
      label={{ text: `You are here`, color: "red", fontSize: "14px" }}
    />
  );
};
