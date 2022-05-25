import { createContext } from "react";

const TimeWindowAutomaticContext = createContext({
  timeWindowAutomatic: false,
  changeTimeWindowAutomatic: () => {},
});
export default TimeWindowAutomaticContext;
