import { createContext } from "react";

const OpenCloseLegendPanelContext = createContext({
  openCloseLegendPanel: false,
  changeOpenCloseLegendPanel: () => {},
});
export default OpenCloseLegendPanelContext;
