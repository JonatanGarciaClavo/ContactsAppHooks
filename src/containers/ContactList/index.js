import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { EDIT_PATHNAME, DETAIL_PATHNAME } from '../../globals/pathNames';
import { makeSelectContactListPopulated } from '../../state/contacts/selectors';
import useContactEffects from '../../state/contacts/effects';
import { Context as ContactsContext } from '../../state/contacts/context';
import { Context as GroupsContext } from '../../state/groups/context';
import { Context as ListSettingsContext } from '../../state/listSettings/context';
import { LIST_MODE } from '../../state/listSettings/state';
import ContactListComponent from '../../components/ContactListComponent';
import ContactCardListComponent from '../../components/ContactCardListComponent';

const useStyles = makeStyles(() => ({
  root: { margin: '0.2em 0 0 0' },
}));

function ListContactPage({ history }) {
  const classes = useStyles();
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
    <div className={classes.root}>
      {mode === LIST_MODE ? (
        <ContactListComponent
          contacts={contacts}
          onItemClick={transitionToContactDetail}
          onDeleteItemClick={deleteContact}
        />
      ) : (
        <ContactCardListComponent
          contacts={contacts}
          onItemClick={transitionToEditContact}
          onDeleteItemClick={deleteContact}
        />
      )}
    </div>
  );
}

ListContactPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ListContactPage;
