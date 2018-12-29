import { createStateSelector } from 'react-selector-hooks';
import { makeSelectGroupsData } from '../groups/selectors';

const selectContactsDomain = () => state => state.contacts;

const makeSelectContactsIds = () =>
  createStateSelector([selectContactsDomain()], contacts => contacts.ids);

const makeSelectContactsData = () =>
  createStateSelector([selectContactsDomain()], contacts => contacts.data);

const makeSelectContactById = id =>
  createStateSelector([makeSelectContactsData()], contacts => contacts[id] || {});

const makeSelectContactByIdPopulated = id =>
  createStateSelector([makeSelectContactsData(), makeSelectGroupsData()], (contacts, groups) => {
    const contact = contacts[id];
    if (contact) {
      return {
        ...contact,
        groups: (contact.groups || []).map(groupId => groups[groupId]),
      };
    }
  });

const makeSelectContactListPopulated = () =>
  createStateSelector(
    [makeSelectContactsIds(), makeSelectContactsData(), makeSelectGroupsData()],
    (ids, data, groups) => {
      return ids.map(id => ({
        ...data[id],
        groups: (data[id].groups || []).map(groupId => groups[groupId].name).join(', '),
      }));
    },
  );

export {
  selectContactsDomain,
  makeSelectContactListPopulated,
  makeSelectContactById,
  makeSelectContactByIdPopulated,
};
