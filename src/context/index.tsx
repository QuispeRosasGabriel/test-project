import React, { createContext, useState } from "react";

export const AppContext = createContext({});

// Create the context provider component
export const AppContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const contextValue = {
    count,
    incrementCount,
  };

  // Provide the context value to the children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
