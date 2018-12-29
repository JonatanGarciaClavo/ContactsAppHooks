import React from 'react';
import useGroupsReducer from './reducer';

const GroupsContext = React.createContext();

const { Consumer } = GroupsContext;

function GroupsProvider({ children }) {
  const groups = useGroupsReducer();
  return <GroupsContext.Provider value={groups}>{children}</GroupsContext.Provider>;
}

export { GroupsProvider as Provider, Consumer, GroupsContext as Context };
