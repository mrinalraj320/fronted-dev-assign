// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/database"

import "firebase/database";

 const firebaseConfig = {
    apiKey: "AIzaSyDE_Pzo3GDCiZNKkUqzMz9nye4MO8w3Fhc",
    authDomain: "fronted-dev-assign.firebaseapp.com",
    projectId: "fronted-dev-assign",
    storageBucket: "fronted-dev-assign.appspot.com",
    messagingSenderId: "1091075283198",
    appId: "1:1091075283198:web:a17f6666ac74785de62daf"
  };

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();