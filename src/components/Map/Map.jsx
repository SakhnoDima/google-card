import React, { useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

import s from "./Map.module.css";
import { defaultTheme } from "./defaultTheme";
import { CurrentLocationMarker } from "../CurrentLocationMarker";
import { MODES } from "../Constant/constant";
import { Marker } from "../Marker";

const containerStyle = {
  width: "500px",
  height: "500px",
  margin: "0 auto",
  border: "2px solid rgb(34, 34, 34)",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableControl: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullScreenControl: false,
  styles: defaultTheme,
};

const Map = ({ center, mode, markers, handleSetMarkers }) => {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc) => {
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        handleSetMarkers({ lat, lng });
      }
    },
    [mode, handleSetMarkers]
  );
  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onClick={onClick}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <CurrentLocationMarker position={center} />

        {markers.map((position) => {
          return <Marker key={position.lat} position={position} />;
        })}
      </GoogleMap>
    </div>
  );
};

export { Map };
