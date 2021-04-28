import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from './firebaseConfig';

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

console.log('firebase', firebase);

export { firebase, FieldValue };
