import { defaultCenter } from "../components/Constant/constant";

export const getBrowserLocation = () => {
  return new Promise((res, rej) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          res({ lat, lng });
        },
        () => {
          rej(defaultCenter);
        }
      );
    } else {
      rej(defaultCenter);
    }
  });
};
