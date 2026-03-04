import React, { createContext, useContext, useReducer } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};


export default function useGlobalReducer() {
  const { store, dispatch } = useContext(StoreContext);
  return { store, dispatch };
}