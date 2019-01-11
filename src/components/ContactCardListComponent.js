import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ContactCard from './ContactCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flex: '0 0 auto',
    flexWrap: 'wrap',
    margin: '1em',
    justifyContent: 'space-between',
  },
}));

const ContactCardListComponent = ({ contacts, onItemClick, onDeleteItemClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEditClick={onItemClick}
          onDeleteClick={onDeleteItemClick}
        />
      ))}
    </div>
  );
};

export default ContactCardListComponent;
