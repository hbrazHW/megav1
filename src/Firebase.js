import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBWruvj_lT9ipJhB1LVAMrA8uSafIJkZbE",
  authDomain: "portal-trendsgr.firebaseapp.com",
  projectId: "portal-trendsgr",
  storageBucket: "portal-trendsgr.appspot.com",
  messagingSenderId: "60676389550",
  appId: "1:60676389550:web:755037292ba8b39d010b3f"
};

app.initializeApp(firebaseConfig);

const firebase = app.firestore()
const auth = app.auth()

export {firebase, auth}