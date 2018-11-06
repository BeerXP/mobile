import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLI8L0uKKbMoz7BLFXIsU5YLxQFQv0l2s",
  authDomain: "beerxp-dev.firebaseapp.com",
  databaseURL: "https://beerxp-dev.firebaseio.com",
  storageBucket: "beerxp-dev.appspot.com",
  projectId: "beerxp-dev",
  messagingSenderId: "399026205463"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
