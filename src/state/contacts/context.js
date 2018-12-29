import React from 'react';
import useContactsReducer from './reducer';

const ContactsContext = React.createContext();

const { Consumer } = ContactsContext;

function ContactsProvider({ children }) {
  const contacts = useContactsReducer();
  return <ContactsContext.Provider value={contacts}>{children}</ContactsContext.Provider>;
}

export { ContactsProvider as Provider, Consumer, ContactsContext as Context };
