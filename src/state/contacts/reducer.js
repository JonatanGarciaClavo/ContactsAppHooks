import { useReducer } from 'react';

const ADD_CONTACT = 'contacts/ADD_CONTACT';
const UPDATE_CONTACT = 'contacts/UPDATE_CONTACT';
const DELETE_CONTACT = 'contacts/DELETE_CONTACT';
const LIST_CONTACTS = 'contacts/LIST_CONTACTS';

function useContactsReducer() {
  const [contacts, dispatch] = useReducer(
    (state, action) => {
      const payload = action.payload;
      switch (action.type) {
        case ADD_CONTACT:
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
        case UPDATE_CONTACT:
          return {
            ...state,
            data: {
              ...state.data,
              [payload.id]: {
                ...payload,
              },
            },
          };
        case DELETE_CONTACT:
          const { [payload.id]: _, ...others } = state.data;
          return {
            ...state,
            ids: state.ids.filter(id => id !== payload.id),
            data: {
              ...others,
            },
          };
        case LIST_CONTACTS:
          return {
            ...state,
            ids: payload.map(({ id }) => id),
            data: payload.reduce((data, contact) => {
              data[contact.id] = contact;
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
  const addContact = payload =>
    dispatch({
      type: ADD_CONTACT,
      payload,
    });
  const updateContact = payload =>
    dispatch({
      type: UPDATE_CONTACT,
      payload,
    });
  const deleteContact = payload =>
    dispatch({
      type: DELETE_CONTACT,
      payload,
    });
  const listContacts = payload =>
    dispatch({
      type: LIST_CONTACTS,
      payload,
    });
  return [contacts, { addContact, updateContact, deleteContact, listContacts }];
}

export default useContactsReducer;
