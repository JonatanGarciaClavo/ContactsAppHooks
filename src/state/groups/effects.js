import { useContext, useCallback } from 'react';
import { Context as GroupsContext } from './context';
import { Context as SnackbarContext } from '../snackbar/context';
import {
  postGroupService,
  updateGroupService,
  deleteGroupService,
  getGroupsService,
  getGroupService,
} from '../../services/groups';

export default function useGroupsEffects() {
  const {
    1: { addGroups, updateGroups, deleteGroups, listGroups },
  } = useContext(GroupsContext);
  const {
    1: { setMessage, displayError },
  } = useContext(SnackbarContext);
  const createGroup = useCallback(async group => {
    try {
      const payload = await postGroupService(group);
      addGroups(payload);
      setMessage('Group created successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const updateGroupRequest = useCallback(async group => {
    try {
      const payload = await updateGroupService(group);
      setMessage('Group updated successfully');
      updateGroups(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const deleteGroupRequest = useCallback(async id => {
    try {
      await deleteGroupService(id);
      deleteGroups(id);
      setMessage('Group deleted successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestGroupList = useCallback(async () => {
    try {
      const payload = await getGroupsService();
      listGroups(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestGroup = useCallback(async id => {
    try {
      await getGroupService(id);
      updateGroups(id);
    } catch (error) {
      displayError(error);
    }
  }, []);
  return {
    createGroup,
    updateGroupRequest,
    deleteGroupRequest,
    requestGroupList,
    requestGroup,
  };
}
