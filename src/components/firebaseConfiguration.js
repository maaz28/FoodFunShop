import firebase from 'firebase/app';
import 'firebase/database';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmomBlO3mrQWAOtBEQM3-lz38k7poHeDI",
    authDomain: "chatapplication-73580.firebaseapp.com",
    databaseURL: "https://chatapplication-73580.firebaseio.com",
    projectId: "chatapplication-73580",
    storageBucket: "chatapplication-73580.appspot.com",
    messagingSenderId: "723230177049"
  };
  firebase.initializeApp(config);

  const db = firebase.database();

  export default db;