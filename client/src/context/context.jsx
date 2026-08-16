
import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer.jsx";

export const GlobalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;