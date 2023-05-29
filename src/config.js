import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBiU6dTYgSR5_YdRJgttAEJmmGUtKEL6ws",
    authDomain: "notesapp-a0796.firebaseapp.com",
    projectId: "notesapp-a0796",
    storageBucket: "notesapp-a0796.appspot.com",
    messagingSenderId: "484075955499",
    appId: "1:484075955499:web:38bfece72117d9c452916e",
    measurementId: "G-C857RZLY8Y"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

  }

  export {firebase};