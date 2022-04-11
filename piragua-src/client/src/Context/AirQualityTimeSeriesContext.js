import { createContext } from "react";

const AirQualityTimeSeriesContext = createContext({
  airQualityTimeSeries: null,
  changeAirQualityTimeSeries: () => {},
});
export default AirQualityTimeSeriesContext;
