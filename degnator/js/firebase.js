// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGOtEUGmh6Tr01Ty22fnsCB__q1B0zDu4",
    authDomain: "degnator-f0c22.firebaseapp.com",
    databaseURL: "https://degnator-f0c22.firebaseio.com",
    projectId: "degnator-f0c22",
    storageBucket: "degnator-f0c22.appspot.com",
    messagingSenderId: "679093834632",
    appId: "1:679093834632:web:858cabf893076f3bb7a03d",
    measurementId: "G-5GCV8TJXQQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// update firestore settings
db.settings({ timestampsInSnapshots: true });

// getting current authenticated user
// var userId = firebase.auth().currentUser.uid;