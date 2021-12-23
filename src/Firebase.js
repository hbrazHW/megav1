import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDgBYfXzjEr5iD3YJmtaXY5hg4qJNmtmG0",
  authDomain: "soporte-megatlon.firebaseapp.com",
  projectId: "soporte-megatlon",
  storageBucket: "soporte-megatlon.appspot.com",
  messagingSenderId: "104811763190",
  appId: "1:104811763190:web:6025c412343381891aa3d7"
};

app.initializeApp(firebaseConfig);

const firebase = app.firestore()
const auth = app.auth()

export {firebase, auth}