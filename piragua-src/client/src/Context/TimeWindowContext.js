import { createContext } from "react";

const TimeWindowContext = createContext({
  timeWindow: false,
  changeTimeWindow: () => {},
});
export default TimeWindowContext;
