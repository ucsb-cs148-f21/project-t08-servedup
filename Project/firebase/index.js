import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
      apiKey: 'AIzaSyAGAPiJ4hblg4P4tbExbqdqZVDZKu7Dvw8',
      authDomain: 'served-up-63c2e.firebaseapp.com',
      databaseURL: 'https://served-up-63c2e.firebaseio.com',
      projectId: 'served-up-63c2e',
      storageBucket: 'served-up-63c2e.appspot.com',
      //messagingSenderId: 'sender-id',
      appId: '1:456652905966:ios:80d960e213cb40ea1182ff',
      //measurementId: 'G-measurement-id',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };