import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB1GATIyuA6FNnAUMBz0kXJ62EvlSWx99o',
  authDomain: 'redux-contacts-app.firebaseapp.com',
  databaseURL: 'https://redux-contacts-app.firebaseio.com/',
};

firebase.initializeApp(config);

export default firebase;
