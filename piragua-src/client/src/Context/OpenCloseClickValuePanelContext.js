import { createContext } from "react";

const OpenCloseClickValuePanelContext = createContext({
  openCloseClickValuePanel: false,
  changeOpenCloseClickValuePanel: () => {},
});
export default OpenCloseClickValuePanelContext;
