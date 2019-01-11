import React, { useContext, useCallback, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
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
      render={({ handleSubmit, pristine, invalid, submitting, form }) => (
        <form style={styles.formContainer} onSubmit={handleSubmit}>
          <Field name="name" label="Name" placeholder="Name" component={FormTextField} />
          <div>
            <Button
              style={styles.buttonStyle}
              variant="contained"
              color="primary"
              type="submit"
              disabled={pristine || submitting || invalid}
            >
              Save group
            </Button>
            <Button
              style={styles.buttonStyle}
              variant="contained"
              color="secondary"
              disabled={pristine || submitting}
              onClick={form.reset}
            >
              Reset values
            </Button>
          </div>
        </form>
      )}
    />
  );
}

export default CreateOrEditGroupPage;
