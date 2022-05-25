import { createContext } from "react";

const OpenCloseStationAutomaticPanelContext = createContext({
  openCloseStationAutomaticPanel: false,
  changeOpenCloseStationAutomaticPanel: () => {},
});
export default OpenCloseStationAutomaticPanelContext;
