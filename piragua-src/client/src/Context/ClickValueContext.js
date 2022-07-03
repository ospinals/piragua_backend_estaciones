import { createContext } from "react";

const ClickValueContext = createContext({
  clickValue: null,
  changeClickValue: () => {},
});
export default ClickValueContext;
