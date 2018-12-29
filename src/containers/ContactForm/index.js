import React, { useCallback, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import RaisedButton from 'material-ui/RaisedButton';
import FormTextField from '../../components/FormTextField';
import FormMultiSelectField from '../../components/FormMultiSelectField';
import validate from './form-validations';
import { makeSelectFormOptions } from '../../state/groups/selectors';
import { makeSelectContactById } from '../../state/contacts/selectors';
import { Context as ContactsContext } from '../../state/contacts/context';
import { Context as GroupsContext } from '../../state/groups/context';
import useGroupEffects from '../../state/groups/effects';
import useContactEffects from '../../state/contacts/effects';

const styles = {
  formContainer: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonStyle: {
    margin: '2em 0 0 1em',
  },
};

function CreateOrEditContactPage({ match, history }) {
  const [contacts] = useContext(ContactsContext);
  const [groups] = useContext(GroupsContext);
  const { requestContact, updateContactRequest, createContact } = useContactEffects();
  const { requestGroupList } = useGroupEffects();
  const initializeView = useCallback(() => {
    requestGroupList();
    if (match.params && match.params.id) {
      requestContact(match.params.id);
    }
  });
  const saveContact = useCallback(contact => {
    if (contact.id) {
      updateContactRequest(contact);
    } else {
      createContact(contact);
    }
    history.goBack();
  });
  useEffect(
    () => {
      initializeView();
    },
    [match.params.id],
  );
  const store = {
    contacts,
    groups,
  };
  const initialValues = makeSelectContactById(match.params.id)(store);
  const groupOptions = makeSelectFormOptions()(store);

  return (
    <Form
      onSubmit={saveContact}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, pristine, invalid, submitting, reset }) => (
        <form style={styles.formContainer} onSubmit={handleSubmit}>
          <Field name="name" label="Name" placeholder="Name" component={FormTextField} />
          <Field name="email" label="Email" placeholder="Email" component={FormTextField} />
          <Field
            name="phoneNumber"
            label="Phone number"
            placeholder="Phone number"
            component={FormTextField}
          />
          <Field
            name="imgUrl"
            label="Profile image url"
            placeholder="Profile image url"
            component={FormTextField}
          />
          <Field
            name="groups"
            component={FormMultiSelectField}
            label="Groups"
            options={groupOptions}
          />
          <div>
            <RaisedButton
              style={styles.buttonStyle}
              label="Save contact"
              primary
              type="submit"
              disabled={pristine || submitting || invalid}
            />
            <RaisedButton
              style={styles.buttonStyle}
              label="Reset values"
              secondary
              disabled={pristine || submitting}
              onClick={reset}
            />
          </div>
        </form>
      )}
    />
  );
}

export default CreateOrEditContactPage;
