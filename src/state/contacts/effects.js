import { useContext, useCallback } from 'react';
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

export default function useContactEffects() {
  const {
    1: { addContact, updateContact, deleteContact, listContacts },
  } = useContext(ContactsContext);
  const {
    1: { setMessage, displayError },
  } = useContext(SnackbarContext);
  const { requestGroupList } = useGroupEffects();
  const createContact = useCallback(async contact => {
    try {
      requestGroupList();
      const payload = await postContactService(contact);
      addContact(payload);
      setMessage('Contact created successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const updateContactRequest = useCallback(async contact => {
    try {
      const payload = await updateContactService(contact);
      setMessage('Contact updated successfully');
      updateContact(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const deleteContactRequest = useCallback(async id => {
    try {
      await deleteContactService(id);
      deleteContact(id);
      setMessage('Contact deleted successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestContactList = useCallback(async () => {
    try {
      requestGroupList();
      const payload = await getContactsService();
      listContacts(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestContact = useCallback(async id => {
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
