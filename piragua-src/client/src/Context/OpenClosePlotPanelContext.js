import { createContext } from "react";

const OpenClosePlotPanelContext = createContext({
  openClosePlotPanel: false,
  changeOpenClosePlotPanel: () => {},
});
export default OpenClosePlotPanelContext;
