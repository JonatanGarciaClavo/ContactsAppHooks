import { useContext } from 'react';
import { Context as GroupsContext } from './context';
import { Context as SnackbarContext } from '../snackbar/context';
import {
  postGroupService,
  updateGroupService,
  deleteGroupService,
  getGroupsService,
  getGroupService,
} from '../../services/groups';
import useAsyncLoaderCallback from '../shared/useAsyncLoaderCallback';

export default function useGroupsEffects() {
  const {
    1: { addGroups, updateGroups, deleteGroups, listGroups },
  } = useContext(GroupsContext);
  const {
    1: { setMessage, displayError },
  } = useContext(SnackbarContext);
  const createGroup = useAsyncLoaderCallback(async group => {
    try {
      const payload = await postGroupService(group);
      addGroups(payload);
      setMessage('Group created successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const updateGroupRequest = useAsyncLoaderCallback(async group => {
    try {
      const payload = await updateGroupService(group);
      setMessage('Group updated successfully');
      updateGroups(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const deleteGroupRequest = useAsyncLoaderCallback(async id => {
    try {
      await deleteGroupService(id);
      deleteGroups(id);
      setMessage('Group deleted successfully');
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestGroupList = useAsyncLoaderCallback(async () => {
    try {
      const payload = await getGroupsService();
      listGroups(payload);
    } catch (error) {
      displayError(error);
    }
  }, []);
  const requestGroup = useAsyncLoaderCallback(async id => {
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
