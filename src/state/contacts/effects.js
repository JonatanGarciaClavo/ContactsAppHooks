import { useContext } from 'react';
import { Context as ContactsContext } from './context';
import { Context as SnackbarContext } from '../snackbar/context';
import {
  postContactService,
  updateContactService,
  deleteContactService,
  getContactsService,
  getContactService,
} from '../../services/contacts';
import useGroupEffects from '../groups/effects';
import useAsyncLoaderCallback from '../shared/useAsyncLoaderCallback';

export default function useContactEffects() {
  const {
    1: { addContact, updateContact, deleteContact, listContacts },
  } = useContext(ContactsContext);
  const {
    1: { setMessage, displayError },
  } = useContext(SnackbarContext);
  const { requestGroupList } = useGroupEffects();
  const createContact = useAsyncLoaderCallback(async contact => {
    try {
      requestGroupList();
      const payload = await postContactService(contact);
      addContact(payload);
      setMessage('Contact created successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const updateContactRequest = useAsyncLoaderCallback(async contact => {
    try {
      const payload = await updateContactService(contact);
      setMessage('Contact updated successfully');
      updateContact(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const deleteContactRequest = useAsyncLoaderCallback(async id => {
    try {
      await deleteContactService(id);
      deleteContact(id);
      setMessage('Contact deleted successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestContactList = useAsyncLoaderCallback(async () => {
    try {
      requestGroupList();
      const payload = await getContactsService();
      listContacts(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestContact = useAsyncLoaderCallback(async id => {
    try {
      requestGroupList();
      await getContactService(id);
      updateContact(id);
    } catch (error) {
      displayError(error);
    }
  }, []);
  return {
    createContact,
    updateContactRequest,
    deleteContactRequest,
    requestContactList,
    requestContact,
  };
}
