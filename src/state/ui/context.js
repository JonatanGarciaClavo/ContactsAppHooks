import React from 'react';
import useUIReducer from './reducer';

const UIContext = React.createContext();

const { Consumer } = UIContext;

function UIProvider({ children }) {
  const ui = useUIReducer();
  return <UIContext.Provider value={ui}>{children}</UIContext.Provider>;
}

export { UIProvider as Provider, Consumer, UIContext as Context };
