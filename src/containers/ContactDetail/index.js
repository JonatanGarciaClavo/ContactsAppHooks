import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ContactCard from '../../components/ContactCard';
import { EDIT_PATHNAME } from '../../globals/pathNames';
import { makeSelectContactById } from '../../state/contacts/selectors';
import { Context as ContactsContext } from '../../state/contacts/context';
import useContactEffect from '../../state/contacts/effects';

const useStyles = makeStyles(() => ({
  root: { margin: '1em' },
}));

function ContactPage({ match, history }) {
  const classes = useStyles();
  const [contacts, { deleteContact }] = useContext(ContactsContext);
  const { requestContact } = useContactEffect();
  const contact = makeSelectContactById(match.params.id)({ contacts });
  const onEditClick = useCallback(id => {
    history.push(`${EDIT_PATHNAME}/${id}`);
  });
  const onDeleteClick = useCallback(id => {
    deleteContact(id);
  }, []);
  useEffect(
    () => {
      requestContact(match.params.id);
    },
    [match.params.id],
  );
  return (
    <div className={classes.root}>
      <ContactCard big contact={contact} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
    </div>
  );
}

ContactPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ContactPage;
