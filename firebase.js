import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsNJNMrk-t0vG8-fEyrQAahmhq2SOEbh4",
  authDomain: "chat-bee77.firebaseapp.com",
  projectId: "chat-bee77",
  storageBucket: "chat-bee77.appspot.com",
  messagingSenderId: "1075669771045",
  appId: "1:1075669771045:web:ab35da3907eb14820e30cc",
  measurementId: "G-KLLR70QQ1N"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };