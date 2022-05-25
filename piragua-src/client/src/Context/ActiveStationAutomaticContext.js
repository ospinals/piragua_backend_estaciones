import { createContext } from "react";

const ActiveStationAutomaticContext = createContext({
  activeStationAutomatic: null,
  changeActiveStationAutomatic: () => {},
});
export default ActiveStationAutomaticContext;
