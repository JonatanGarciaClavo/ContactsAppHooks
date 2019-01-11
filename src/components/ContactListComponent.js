import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ContactListItem from './ContactListItem';

const ContactListComponent = ({ contacts, onItemClick, onDeleteItemClick }) => (
  <List subheader={<ListSubheader>Contacts</ListSubheader>}>
    {contacts.map(contact => (
      <ContactListItem
        key={contact.id}
        contact={contact}
        onClick={onItemClick}
        onDeleteClick={onDeleteItemClick}
      />
    ))}
  </List>
);

export default ContactListComponent;
