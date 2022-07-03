import { createContext } from "react";

const ShowPrecipitationContext = createContext({
  showPrecipitation: false,
  changeShowPrecipitation: () => {},
});
export default ShowPrecipitationContext;
