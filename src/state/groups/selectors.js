import { createStateSelector } from 'react-selector-hooks';

const selectGroupsDomain = () => state => state.groups;

const makeSelectGroupsIds = () => createStateSelector([selectGroupsDomain()], groups => groups.ids);

const makeSelectGroupsData = () =>
  createStateSelector([selectGroupsDomain()], groups => groups.data);

const makeSelectGroupById = id =>
  createStateSelector([makeSelectGroupsData()], groups => groups[id]);

const makeSelectFormOptions = () =>
  createStateSelector([selectGroupsDomain()], state =>
    state.ids.map(key => {
      const { id, name } = state.data[key];
      return {
        value: id,
        text: name,
      };
    }),
  );

export default selectGroupsDomain;

export { makeSelectGroupsIds, makeSelectGroupsData, makeSelectGroupById, makeSelectFormOptions };
