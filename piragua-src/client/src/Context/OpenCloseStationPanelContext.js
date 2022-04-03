import { createContext } from "react";

const OpenCloseStationPanelContext = createContext({
  openCloseStationPanel: false,
  changeOpenCloseStationPanel: () => {},
});
export default OpenCloseStationPanelContext;
