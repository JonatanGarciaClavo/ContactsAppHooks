import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactCard from '../../components/ContactCard';
import { EDIT_PATHNAME, DETAIL_PATHNAME } from '../../globals/pathNames';
import { makeSelectContactListPopulated } from '../../state/contacts/selectors';
import useContactEffects from '../../state/contacts/effects';
import { Context as ContactsContext } from '../../state/contacts/context';
import { Context as GroupsContext } from '../../state/groups/context';
import { Context as ListSettingsContext } from '../../state/listSettings/context';
import { LIST_MODE } from '../../state/listSettings/state';

function renderContactListItems(contacts, transitionToContactDetail, deleteContact) {
  return contacts.map(contact => (
    <React.Fragment key={`contact-${contact.id}`}>
      <ListItem onClick={() => transitionToContactDetail(contact.id)}>
        <ListItemAvatar>
          {contact.imgUrl ? (
            <Avatar src={contact.imgUrl} />
          ) : (
            <Avatar>{contact.name.substring(0, 1)}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={contact.name} secondary={contact.groups || 'Without group'} />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon onClick={() => deleteContact(contact.id)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  ));
}

function renderContactCardList(contacts, transitionToEditContact, deleteContact) {
  return contacts.map(contact => (
    <ContactCard
      key={`contact-${contact.id}`}
      contact={contact}
      onEditClick={() => transitionToEditContact(contact.id)}
      onDeleteClick={() => deleteContact(contact.id)}
    />
  ));
}

function renderContactList(
  mode,
  contacts,
  transitionToContactDetail,
  transitionToEditContact,
  deleteContact,
) {
  if (mode === LIST_MODE) {
    return (
      <List subheader={<ListSubheader>Contacts</ListSubheader>}>
        {renderContactListItems(contacts, transitionToContactDetail, deleteContact)}
      </List>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        flex: '0 0 auto',
        flexWrap: 'wrap',
        margin: '1em',
        justifyContent: 'space-between',
      }}
    >
      {renderContactCardList(contacts, transitionToEditContact, deleteContact)}
    </div>
  );
}

function ListContactPage({ history }) {
  const { mode } = useContext(ListSettingsContext);
  const [storedContacts] = useContext(ContactsContext);
  const [storedGroups] = useContext(GroupsContext);
  const contacts = makeSelectContactListPopulated()({
    contacts: storedContacts,
    groups: storedGroups,
  });
  const { requestContactList, deleteContactRequest } = useContactEffects();
  const transitionToEditContact = useCallback(id => history.push(`${EDIT_PATHNAME}/${id}`));
  const transitionToContactDetail = useCallback(id => history.push(`${DETAIL_PATHNAME}/${id}`));
  const deleteContact = useCallback(id => {
    deleteContactRequest(id);
    requestContactList();
  });
  useEffect(() => {
    requestContactList();
  }, []);
  return (
    <div style={{ margin: '0.2em 0 0 0' }}>
      {renderContactList(
        mode,
        contacts,
        transitionToContactDetail,
        transitionToEditContact,
        deleteContact,
      )}
    </div>
  );
}

ListContactPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ListContactPage;
