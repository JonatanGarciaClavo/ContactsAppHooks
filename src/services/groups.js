import firebase from './index';

const BASE_URL = "/groups";

export function getGroupsService() {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.once(
      "value",
      groupsDB => {
        const groupsDBValue = groupsDB.val();
        const groups = [];
        Object.keys(groupsDBValue).map((id) =>
          groups.push({
            id,
            ...groupsDBValue[id]
          })
        );
        return resolve(groups);
      },
      err => reject(err)
    );
  });
}

export function getGroupService(id) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.once(
      "value",
      groupDB => {
        const groupDBValue = groupDB.val();
        groupDBValue.id = id;
        return resolve(groupDBValue);
      },
      err => reject(err)
    );
  });
}

export function postGroupService(group) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}`);
  return new Promise((resolve, reject) => {
    const post = firebaseConnection.push();
    post.set(group, err => {
      if (err) {
        return reject(err);
      }
      return resolve({
        id: post.key,
        ...group,
      });
    });
  });
}

export function updateGroupService({ id, ...others }) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.set({ ...others }, err => {
      if (err) {
        return reject(err);
      }
      return resolve({
        id,
        ...others
      });
    });
  });
}

export function deleteGroupService(id) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.set(null, err => {
      if (err) {
        return reject(err);
      }
      return resolve({ id });
    });
  });
}
