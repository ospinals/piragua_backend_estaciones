import { createContext } from "react";

const ActiveStationContext = createContext({
  activeStation: null,
  changeActiveStation: () => {},
});
export default ActiveStationContext;
