import { createContext } from "react";

const AirQualityActiveStationParametersContext = createContext({
  airQualityActiveStationParameters: null,
  changeAirQualityActiveStationParameters: () => {},
});
export default AirQualityActiveStationParametersContext;
