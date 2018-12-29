import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
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
    <div key={`contact-${contact.id}`}>
      <ListItem
        leftAvatar={
          contact.imgUrl ? (
            <Avatar src={contact.imgUrl} />
          ) : (
            <Avatar>{contact.name.substring(0, 1)}</Avatar>
          )
        }
        primaryText={contact.name}
        secondaryText={contact.groups || 'Without group'}
        secondaryTextLines={1}
        onClick={() => transitionToContactDetail(contact.id)}
        rightIconButton={
          <IconButton>
            <DeleteIcon onClick={() => deleteContact(contact.id)} />
          </IconButton>
        }
      />
      <Divider key={`divider-${contact.id}`} inset />
    </div>
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
      <List>
        <Subheader>Contacts</Subheader>
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
