import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import s from "./Autocomplete.module.css";

const Autocomplete = ({ isLoaded, setCoordinates }) => {
  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  React.useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      console.log(description);

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
          setCoordinates({ lat, lng });
        })
        .catch((error) => console.log("😱 Error", error));
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className={s.listItem}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className={s.container}>
      <input
        className={s.input}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        type="text"
      />
      {status === "OK" && (
        <ul className={s.suggestions}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export { Autocomplete };
