import React from 'react';
import useListSettingsState from './state';

const ListSettingsContext = React.createContext();

const { Consumer } = ListSettingsContext;

function ListSettingsProvider({ children }) {
  const listSettings = useListSettingsState();
  return (
    <ListSettingsContext.Provider value={listSettings}>{children}</ListSettingsContext.Provider>
  );
}

export { ListSettingsProvider as Provider, Consumer, ListSettingsContext as Context };
