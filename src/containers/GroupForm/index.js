import React, { useContext, useCallback, useEffect } from 'react';
// import PropTypes from "prop-types";
import { Form, Field } from 'react-final-form';
import RaisedButton from 'material-ui/RaisedButton';
import FormTextField from '../../components/FormTextField';
import validate from './form-validations';
import { makeSelectGroupById } from '../../state/groups/selectors';
import useGroupEffects from '../../state/groups/effects';
import { Context as GroupsContext } from '../../state/groups/context';

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

function CreateOrEditGroupPage({ match, history }) {
  const [groups] = useContext(GroupsContext);
  const { requestGroup, updateGroupRequest, createGroup } = useGroupEffects();
  const initializeView = useCallback(() => {
    if (match.params && match.params.id) {
      requestGroup(match.params.id);
    }
  });
  const saveGroup = useCallback(contact => {
    if (contact.id) {
      updateGroupRequest(contact);
    } else {
      createGroup(contact);
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
    groups,
  };
  const initialValues = makeSelectGroupById(match.params.id)(store);
  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={saveGroup}
      render={({ handleSubmit, pristine, invalid, submitting, reset }) => (
        <form style={styles.formContainer} onSubmit={handleSubmit}>
          <Field name="name" label="Name" placeholder="Name" component={FormTextField} />
          <div>
            <RaisedButton
              style={styles.buttonStyle}
              label="Save group"
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

export default CreateOrEditGroupPage;
