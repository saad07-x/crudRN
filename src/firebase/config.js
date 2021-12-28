//import * as firebase from 'firebase';
const firebase = require('firebase/app').default
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBlVvem8l2tzlY9SvOIrd7f36Z9SlEZM-A",
    authDomain: "studentapp-bb0c8.firebaseapp.com",
    projectId: "studentapp-bb0c8",
    storageBucket: "studentapp-bb0c8.appspot.com",
    messagingSenderId: "662031696029",
    appId: "1:662031696029:web:93be6d98f7ece0d8e3d474",
    measurementId: "G-CENZVHL82P"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };