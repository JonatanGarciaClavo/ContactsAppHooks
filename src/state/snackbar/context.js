import React from 'react';
import useSnackbarReducer from './state';

const SnackbarContext = React.createContext();

const { Consumer } = SnackbarContext;

function SnackbarProvider({ children }) {
  const snackbar = useSnackbarReducer();
  return <SnackbarContext.Provider value={snackbar}>{children}</SnackbarContext.Provider>;
}

export { SnackbarProvider as Provider, Consumer, SnackbarContext as Context };
