import React, { useCallback, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import s from "./App.module.css";
import { Map } from "./components/Map";
import { Autocomplete } from "./components/Autocmplete";
import Button from "./components/Button/Button";
import { API_KEY, defaultCenter, MODES } from "./components/Constant/constant";
import { getBrowserLocation } from "./utils";

const libraries = ["places"];

const App = () => {
  const [coordinates, setCoordinates] = React.useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  React.useEffect(() => {
    getBrowserLocation()
      .then((curLoc) => setCoordinates(curLoc))
      .catch(() => setCoordinates(defaultCenter));
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onCoordinatesSet = React.useCallback((coordinates) => {
    setCoordinates(coordinates);
  }, []);

  const toggleModes = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
        break;
    }
    console.log(mode);
  }, [mode]);

  const handleSetMarkers = useCallback(
    (coordinates) => {
      setMarkers([...markers, coordinates]);
      console.log(markers);
    },
    [markers]
  );

  const handleDeleteMArkers = () => {
    setMarkers([]);
  };

  return (
    <>
      <div className={s.addressSearchContainer}>
        <Autocomplete isLoaded={isLoaded} setCoordinates={onCoordinatesSet} />
        <Button onClick={toggleModes}>
          <p className={s.buttonText}>Set markers</p>
        </Button>
        <Button onClick={handleDeleteMArkers}>
          <p className={s.buttonText}>Delete markers</p>
        </Button>
      </div>
      {isLoaded ? (
        <Map
          mode={mode}
          center={coordinates}
          markers={markers}
          handleSetMarkers={handleSetMarkers}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default App;
