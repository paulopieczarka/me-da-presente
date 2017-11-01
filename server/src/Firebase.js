const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyAqjvMj53iDBbpMX0XI_-uJ5GHnMb-Rzrk",
    authDomain: "liquid-agility-89823.firebaseapp.com",
    databaseURL: "https://liquid-agility-89823.firebaseio.com",
    projectId: "liquid-agility-89823",
    storageBucket: "liquid-agility-89823.appspot.com",
    messagingSenderId: "430958144807"
};
  
const FirebaseApp = firebase.initializeApp(config);

module.exports = FirebaseApp;