// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBZIg_HzbUdEcdtcxbEmGHuHOEDW4wGtD4",
    authDomain: "esp32-firebase-demo-a4a1c.firebaseapp.com",
    databaseURL: "https://esp32-firebase-demo-a4a1c-default-rtdb.firebaseio.com",
    projectId: "esp32-firebase-demo-a4a1c",
    storageBucket: "esp32-firebase-demo-a4a1c.appspot.com",
    messagingSenderId: "61979677464",
    appId: "1:61979677464:web:f4dc37d52774946e70446d"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
