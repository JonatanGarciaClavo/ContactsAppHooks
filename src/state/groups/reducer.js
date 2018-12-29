import { useReducer } from 'react';

const ADD_GROUP = 'groups/ADD_GROUP';
const UPDATE_GROUP = 'groups/UPDATE_GROUP';
const DELETE_GROUP = 'groups/DELETE_GROUP';
const LIST_GROUPS = 'groups/LIST_GROUPS';

function useGroupsReducer() {
  const [groups, dispatch] = useReducer(
    (state, action) => {
      const payload = action.payload;
      switch (action.type) {
        case ADD_GROUP:
          return {
            ...state,
            ids: [...state.ids, payload.id],
            data: {
              ...state.data,
              [payload.id]: {
                ...payload,
              },
            },
          };
        case UPDATE_GROUP:
          return {
            ...state,
            data: {
              ...state.data,
              [payload.id]: {
                ...payload,
              },
            },
          };
        case DELETE_GROUP:
          const { [payload.id]: _, ...others } = state.data;
          return {
            ...state,
            ids: state.ids.filter(id => id !== payload.id),
            data: {
              ...others,
            },
          };
        case LIST_GROUPS:
          return {
            ...state,
            ids: payload.map(({ id }) => id),
            data: payload.reduce((data, group) => {
              data[group.id] = group;
              return data;
            }, {}),
          };
        default:
          return state;
      }
    },
    {
      ids: [],
      data: {},
    },
  );
  const addGroup = payload =>
    dispatch({
      type: ADD_GROUP,
      payload,
    });
  const updateGroup = payload =>
    dispatch({
      type: UPDATE_GROUP,
      payload,
    });
  const deleteGroup = payload =>
    dispatch({
      type: DELETE_GROUP,
      payload,
    });
  const listGroups = payload =>
    dispatch({
      type: LIST_GROUPS,
      payload,
    });
  return [groups, { addGroup, updateGroup, deleteGroup, listGroups }];
}

export default useGroupsReducer;
