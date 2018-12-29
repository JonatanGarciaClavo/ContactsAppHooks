import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactCard from '../../components/ContactCard';
import { EDIT_PATHNAME } from '../../globals/pathNames';
import { makeSelectContactById } from '../../state/contacts/selectors';
import { Context as ContactsContext } from '../../state/contacts/context';
import useContactEffect from '../../state/contacts/effects';

function ContactPage({ match, history }) {
  const [contacts, { deleteContact }] = useContext(ContactsContext);
  const { requestContact } = useContactEffect();
  const contact = makeSelectContactById(match.params.id)({ contacts });
  const onEditClick = useCallback(() => {
    history.push(`${EDIT_PATHNAME}/${contact.id}`);
  });
  const onDeleteClick = useCallback(() => {
    deleteContact(contact.id);
  }, []);
  useEffect(
    () => {
      requestContact(match.params.id);
    },
    [match.params.id],
  );
  return (
    <div style={{ margin: '1em' }}>
      <ContactCard big contact={contact} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
    </div>
  );
}

ContactPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ContactPage;
